import mongo from '../util/mongo.js'
import helper from '../util/helper.js';
import { cookies } from 'next/headers'

export async function GET(request) {
    const headers = request.headers;
    const commentID = headers.get('chipID');
  
    const db = await mongo()
    const data = await db.collection('Comment').find({CommentId: commentID}).toArray();
    return new Response(JSON.stringify(data), {
      status: 200,
    });
  }
  

export async function POST(request) {
    const res = await request.json()
    res["w_number"] = cookies().get('w_number').value
    if (res.sender == "admin") {
        await helper.sendEmail(
            res.email, 
            "New Comment on Proposed Schedule", 
            `Hello! Your Schedule has a New Comment, To view comment click your most recent submission in the Counselors Portal here <a href="${process.env.NEXT_PUBLIC_LINK}">link</a> MESSAGE: "${res.comment}"`
            )
    }
    
    const db = await mongo()
    const data = await db.collection('Comment').insertOne(res)
    return Response.json({ data })
}
