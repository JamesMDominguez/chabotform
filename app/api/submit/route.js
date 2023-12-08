import mongoose from 'mongoose';
import nodemailer from 'nodemailer';

let db = undefined;

const isConnected = async () => {
  if (db === undefined) {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      db = mongoose.connection.db;
      console.log("Mongo connected")
    } catch (error) {
      console.error('MongoDB connection error:', error);
      throw error; // Re-throw the error to propagate it
    }
  }
};

export async function GET() {
  try {
    await isConnected();
    const data = await db.collection('Schedule').find().toArray();
    return new Response(JSON.stringify(data), {
      status: 200,
    });
  } catch (error) {
    console.error('GET request error:', error);
    return new Response('Internal Server Error', {
      status: 500,
    });
  }
}

 

export async function PUT(request) {
  const res = await request.json()
  await isConnected()

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'jamesdominguez2020@gmail.com',
      pass: process.env.EMAILPASS,
    },
  });

  const mailOptions = {
    from: 'jamesdominguez2020@gmail.com',
    to: res.email,
    subject: `Proposed Schedule Update`,
    html: `
    <!DOCTYPE html>
    <html>
    <head>
    </head>
    <body>
        <h3>Hello! We are pleased to inform you that your schedule has been reviewed and approved. Thank you for your prompt submission.</h3>
    </body>
    </html>
    `,
    };

  const ResubmissionMailOptions = {
    from: 'jamesdominguez2020@gmail.com',
    to: res.email,
    subject: `Proposed Schedule Update`,
    html: `
    <!DOCTYPE html>
    <html>
    <head>
    </head>
    <body>
      <h3>Hello! We have reviewed your schedule and it requires resubmission. Please make the necessary changes and submit again using this <a href="${process.env.NEXTAUTH_URL +"resubmission/" +res.id}">LINK</a>. Thank you.</h3>
    </body>
    </html>
    `,
    };
    if(res.approval == "Approved"){
    console.log(res)
    try {
      await transporter.sendMail(mailOptions);
      console.log('Email sent');
  } catch (error) {
      console.error('Failed to send email:', error);
  }
  }else if(res.approval == "PendingResubmission"){
    try {
      await transporter.sendMail(ResubmissionMailOptions);
      console.log('Resubmission Email sent');
      const data = await db.collection('Schedule').updateOne({_id: new mongoose.Types.ObjectId(res.id)}, {$set: {approval:res.approval}})
      return Response.json("Ressibmission Email Sent")

  } catch (error) {
      console.error('Failed to send Resubmission:', error);
  }
  }
  else if(res.data.approval == "Resubmission"){
    try {
      await transporter.sendMail({
        from: 'jamesdominguez2020@gmail.com',
        to: res.data.email,
        subject: `Proposed Schedule Resubmission`,
        html: `
        <!DOCTYPE html>
        <html>
        <head>
        </head>
        <body>
          <h3>Hello! This is a automated email notifying you that we have received your schedule resubmission. Thank you for making necessary changes.</h3>
        </body>
        </html>
        `,
        });
      console.log('Resubmission Email sent');
      console.log(res.data)
      const data = await db.collection('Schedule').updateOne({_id: new mongoose.Types.ObjectId(res.id)}, {$set: res.data})
      console.log(data)
      return Response.json(data)
  } catch (error) {
      console.error('Failed to send Resubmission:', error);
  }
  }

  const data = await db.collection('Schedule').updateOne({_id: new mongoose.Types.ObjectId(res.id)}, {$set: {approval:res.approval}})
  return Response.json(data)
}


export async function POST(request) {
  const res = await request.json()
  await isConnected()
  const data = await db.collection('Schedule').insertOne(res)
  return Response.json(data)
}
