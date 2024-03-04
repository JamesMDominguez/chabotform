import { cookies } from 'next/headers'
import mongo from '../util/mongo.js'

export async function GET(request) {
  const db = await mongo();
  const headers = request.headers;
  const specificHeader = headers.get('w_number');
  
  if (!specificHeader) {
    const data = await db.collection('Users').find().toArray();
    return new Response(JSON.stringify(data), {
      status: 200,
    });
  }
  
  const data = await db.collection('Users').find({ 'w_number': specificHeader }).toArray();

  if (data.length > 0) {
    cookies().set('w_number', specificHeader)
    cookies().set('name', data[0].name)
    cookies().set('email', data[0].email)
    cookies().set('access', data[0].access)
    cookies().set('employmentType', data[0].employmentType)
    return new Response(JSON.stringify({userFound:true,name:data[0].name.split(' ')[0],accessLevel:data[0].access}), {
      status: 200,
    });
  } else {
    return new Response(JSON.stringify({userFound:false}), {
      status: 200,
    });
  }
}

export async function PUT(request) {
  const db = await mongo()
  const res = await request.json()
  const mongoData = await db.collection('Users').updateOne({w_number: cookies().get("w_number").value}, {$set: res})
  return new Response(JSON.stringify(mongoData), {
    status: 200,
  });
}