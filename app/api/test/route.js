import mongoose from 'mongoose';

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
        const key1Value = new URLSearchParams(new URL(request.url).searchParams).get('key');
        await isConnected();
        const data = await db.collection('Comment').find({CommentId: key1Value}).toArray();
        return new Response(JSON.stringify({Comment:data}), {
          status: 200,
        });
      } catch (error) {
        console.error('GET request error:', error);
        return new Response('Internal Server Error', {
          status: 500,
        });
      }
}