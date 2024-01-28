import mongo from '../util/mongo.js'

export async function GET() {
  const db = await mongo()
  const data = await db.collection('Schedule').find({"w_number":"123"}).toArray();
  const data2 = await db.collection('OverloadSchedule').find({"w_number":"123"}).toArray();
  //   const data = await db.collection('Schedule').deleteMany({"w_number":"123"});
  //   const data2 = await db.collection('OverloadSchedule').deleteMany({"w_number":"123"});
  return new Response(JSON.stringify({Schedule:data,OverloadSchedule:data2}), {
    status: 200,
  });
  }