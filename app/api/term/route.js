import mongo from '../util/mongo.js'

export async function GET() {
    const db = await mongo()
    const data = await db.collection('CurrentTerm').find().toArray();
    return new Response(JSON.stringify(data[0]), {
      status: 200,
    });
  }
  
export async function PUT(request) {
    const db = await mongo()
    const res = await request.json()
    const mongoData = await db.collection('CurrentTerm').updateOne({}, {$set: res})
    return new Response(JSON.stringify(mongoData), {
      status: 200,
    });
  }