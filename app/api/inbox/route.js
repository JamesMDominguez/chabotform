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



export async function GET() {
    try {
        await isConnected();
        const data = await db.collection('Inbox').find().toArray();
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
  try {
    const result = await db.collection('Inbox').updateMany({ CommentId: res.id }, { $set: {status:"read"} });
    console.log(result)
    return new Response(JSON.stringify(result), {
        status: 200,
      });
  } catch (error) {
    console.error(error);
    return new Response('Internal Server Error', {
        status: 500,
      });
  }
}
