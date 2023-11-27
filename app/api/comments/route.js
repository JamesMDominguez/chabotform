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

export async function GET(request) {
    try {
        const key1Value = new URLSearchParams(new URL(request.url).searchParams).get('key1');
        await isConnected();
        const data = await db.collection('Comment').find({ CommentId: key1Value }).toArray();
        const data2 = await db.collection('Schedule').find({ _id: new mongoose.Types.ObjectId(key1Value) }).toArray();
        return new Response(JSON.stringify({ Comment: data, Schedule: data2 }), {
            status: 200,
        });
    } catch (error) {
        console.error('GET request error:', error);
        return new Response('Internal Server Error', {
            status: 500,
        });
    }
}

export async function POST(request) {
    const res = await request.json()

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'jamesdominguez2020@gmail.com',
            pass: process.env.EMAILPASS,
        },
    });
    console.log(res)
    const mailOptions = {
        from: 'jamesdominguez2020@gmail.com',
        to: res.email,
        subject: `New Comment on Proposed Schedule`,
        html: `
        <!DOCTYPE html>
        <html>
        <head>
        </head>
        <body>
            <h1>Hello! Your Schedule has a New Comment, To view comment click on this <a href="${process.env.NEXTAUTH_URL + res.CommentId}">link</a> </h1>
        </body>
        </html>
        `,
    };

    if (res.sender == "admin") {
        try {
            await transporter.sendMail(mailOptions);
            console.log('Email sent');
        } catch (error) {
            console.error('Failed to send email:', error);
        }
    }
    
    await isConnected()
    if (res.sender == "user") {
        await db.collection('Inbox').insertOne({ name: res.name, CommentId: res.CommentId, status:"unread"})
    }
    const data = await db.collection('Comment').insertOne(res)
    return Response.json({ data })
}
