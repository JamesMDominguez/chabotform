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

  if(res.approval == "Approved"){
    try {
      await transporter.sendMail(mailOptions);
      console.log('Email sent');
  } catch (error) {
      console.error('Failed to send email:', error);
  }
  }

  await isConnected()
  const data = await db.collection('Schedule').updateOne({_id: new mongoose.Types.ObjectId(res.id)}, {$set: {approval:res.approval}})
  return Response.json({ data })
}