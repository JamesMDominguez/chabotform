import mongo from '../util/mongo.js'
import { cookies } from 'next/headers'
import mongoose from 'mongoose';
import helper from '../util/helper.js';

export async function GET() {
    const db = await mongo()
    const mongoData = await db.collection('OverloadSchedule').find().toArray()
    return Response.json(mongoData)
  }
  
  export async function POST(request) {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; // Months are zero-based
    let yyyy = today.getFullYear();
    let formattedToday = dd + '/' + mm + '/' + yyyy;
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    formattedToday = mm + '/' + dd + '/' + yyyy;
    const db = await mongo()
    const res = await request.json()
    res.name = cookies().get('name').value
    res.email = cookies().get('email').value
    res.dateCreated = formattedToday
    res["w-number"] = cookies().get('w-number').value
    const mongoData = await db.collection('OverloadSchedule').insertOne(res)
    return Response.json(mongoData)
  }
  
  export async function PUT(request) {
    const res = await request.json()
    res.name = cookies().get('name').value
    res.email = cookies().get('email').value
    const db = await mongo()
    console.log(res)
    if(res.approval == "Approved"){
        await helper.sendEmail(res.email, "Overload Schedule Update","Hello! We are pleased to inform you that your schedule has been reviewed and approved. Thank you for your prompt submission")
    }else if(res.approval == "PendingResubmission"){
        await helper.sendEmail(res.email, "Overload Schedule Update",`Hello! We have reviewed your schedule and it requires resubmission. Please make the necessary changes and submit again using resubmission button on the counselor portal page or this <a href="${process.env.NEXT_PUBLIC_LINK +"/resubmission/" +res.id}">LINK</a>. Thank you.`)
    }
    else if(res.approval == "Resubmission"){
        await helper.sendEmail(res.email, "Overload Proposed Schedule Resubmission","Hello! This is a automated email notifying you that we have received your schedule resubmission. Thank you for making necessary changes.")
        const data = await db.collection('overloadSchedule').updateOne({_id: new mongoose.Types.ObjectId(res.id)}, {$set: res})
        console.log(data,"__resubmission")
        return Response.json("Resubmission sent")
    }
  
    await db.collection('overloadSchedule').updateOne({_id: new mongoose.Types.ObjectId(res.id)}, {$set: {approval:res.approval}})
    return Response.json("Submission sent")
  }