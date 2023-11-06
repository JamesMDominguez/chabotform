import mongoose from 'mongoose';
import ObjectId  from 'mongodb';

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
      throw error;
    }
  }
};


export async function GET() {
    try {
      await isConnected();
      const data = await db.collection('Schedule').findOne({_id:new ObjectId('6540b669855133419aa6a71c')});
      return new Response(JSON.stringify(data), {
        status: 200,
      });
    } catch (error) {
      console.error('BSON Error:', error);
      return new Response('Error occurred', {
        status: 500, // Internal Server Error
      });
    }
  }