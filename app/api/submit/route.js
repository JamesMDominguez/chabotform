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

export async function POST(request) {
  const res = await request.json()
  await isConnected()
  const data = await db.collection('Schedule').insertOne(res)
  return Response.json({ data })
}

export async function PUT(request) {
  const res = await request.json()
  await isConnected()
  console.log(res)
  const data = await db.collection('Schedule').updateOne({_id: new mongoose.Types.ObjectId(res.id)}, {$set: {approval:res.approval}})
  console.log(data)
  return Response.json({ data })
}