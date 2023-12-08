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

export async function POST(request) {
    const res = await request.json()
    await isConnected()
    const data = await db.collection('overLoadSchedule').insertOne(res)
    return Response.json(data)
  }