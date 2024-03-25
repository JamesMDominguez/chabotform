import { cookies } from 'next/headers'
import mongo from '../util/mongo.js'

export async function GET() {
  const db = await mongo();
  const w_number = cookies().get('w_number').value;
  const data = await db.collection('Users').find({ 'w_number': w_number }).toArray();
  return new Response(JSON.stringify(data[0]), {
    status: 200,
  });
}