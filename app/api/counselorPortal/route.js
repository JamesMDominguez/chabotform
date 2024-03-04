import { cookies } from 'next/headers'
import mongo from '../util/mongo.js'

export async function GET() {
  const db = await mongo()
  const data = await db.collection('Schedule').find({"w_number":cookies().get("w_number").value}).toArray();
  const data2 = await db.collection('OverloadSchedule').find({"w_number":cookies().get("w_number").value}).toArray();
  const data3 = await db.collection('Users').find({"w_number":cookies().get("w_number").value}).toArray();

  return new Response(JSON.stringify({Schedule:data,OverloadSchedule:data2,emergencyCardSubmited:data3[0].emergencyCardSubmited,employmentType:data3[0].employmentType}), {
    status: 200,
  });
  }