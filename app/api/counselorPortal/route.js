import { cookies } from 'next/headers'
import mongo from '../util/mongo.js'

export async function GET() {
  const db = await mongo()
  const data = await db.collection('Schedule').find({"w-number":cookies().get("w-number").value}).toArray();
  const data2 = await db.collection('OverloadSchedule').find({"w-number":cookies().get("w-number").value}).toArray();
  return new Response(JSON.stringify({Schedule:data,OverloadSchedule:data2}), {
    status: 200,
  });
  }