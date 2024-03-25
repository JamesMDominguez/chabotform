import mongo from '../util/mongo.js'
import nodemailer from 'nodemailer';
import Fun from '../../utils/myFunc.js'
import { cookies } from 'next/headers'
import mongoose from 'mongoose';
import helper from '../util/helper.js';

export async function GET() {
    const db = await mongo()
    const data = await db.collection('Schedule').find().toArray();
    return new Response(JSON.stringify(data), {
      status: 200,
    });
}

const timeRange = [
    "8:00am", "8:30am", "9:00am", "9:30am", "10:00am", "10:30am", "11:00am", "11:30am",
    "12:00pm", "12:30pm", "1:00pm", "1:30pm", "2:00pm", "2:30pm", "3:00pm", "3:30pm",
    "4:00pm", "4:30pm", "5:00pm", "5:30pm", "6:00pm", "6:30pm", "7:00pm"
  ];
  const days = ["Mon", "Tues", "Wed", "Thurs", "Fri"];
  
  export async function POST(request) {
    const db = await mongo()
    const res = await request.json()
    res.name = cookies().get('name').value
    res.email = cookies().get('email').value
    res.employmentType = cookies().get('employmentType').value
    res["w_number"] = cookies().get('w_number').value
    const mongoData = await db.collection('Schedule').insertOne(res)
    const grayOutBox = Fun.grayOutBox;
    const email = res.email;
    const getDailyHours = (day) => {
      let count = 0;
      res?.schedule?.forEach((time) => {
        if (time.day === day) {
          count++;
        }
      });
      return count / 2;
    };
    const findDayTime = (day, time) => {
      let result = res?.schedule?.map((date) => {
        if (date.day === day && date.time === time) {
          return date.option;
        } else {
          return "";
        }
      }).join('');
  
      if (result === '') {
        result = res?.breaks.map((date) => {
          if (date.day === day && date.time === time) {
            return "Break";
          } else {
            return "";
          }
        }).join('');
      }
  
      return result;
    };
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'jamesdominguez2020@gmail.com',
        pass: process.env.EMAILPASS,
      },
    });

    const mailOptionsPartTime = {
      from: 'jamesdominguez2020@gmail.com',
      to: email,
      subject: `Counseling Proposed Schedule`,
      text: `Hello ${res.name}! Your Schedule has been sent`,
      html: `
                    <!DOCTYPE html>
                    <html>
                    <head>
                            <style>
                            table, th, td {
                                    border: 1px solid;
                            }
                            </style>
                    </head>
                    <body>
            
                    <h1>${res.year} ${res.semester}</h1>
                    <h1>Proposed Weekly Schedule</h1>
                    <table>
                    <tr>
                    <td>Time</td>
                    ${days.map((day) => `<td>${day}</td>`).join('')}
                    </tr>
                    <tr>
                    <td>Daily Hours</td>
                    ${days.map((day) => `<td>${getDailyHours(day)}</td>`).join('')}
                    </tr>
                    ${timeRange.map((time, index) => `
                    <tr>
                        <td>${time}</td>
                        ${days.map((day) => `
                        <td style="background-color:${grayOutBox(day, index) ? '#c3c4c7' : ''}">${findDayTime(day, time)}</td>
                        `).join('')}
                    </tr>
                    `).join('')}
                </table>
            </body>
            </html>
            `
    };
    //sashraf@chabotcollege.edu

    const adminOptionsPartTime = {
      from: 'jamesdominguez2020@gmail.com',
      to: ['jamesdominguez2020@gmail.com','sashraf@chabotcollege.edu','cjethi@chabotcollege.edu'],
      subject: `${res.name} Submitted Proposed Schedule`,
      html: `
                <!DOCTYPE html>
                <html>
                <head>
                <style>
                table, th, td {
                        border: 1px solid;
                }
                </style>
                </head>
                <body>
                    <h3>Hello! This is an automatic email notifying you that ${res.name} has submitted their schedule.</h3>
                    <h1>${res.year} ${res.semester}</h1>
                    <table>
                    <tr>
                    <td>Time</td>
                    ${days.map((day) => `<td>${day}</td>`).join('')}
                    </tr>
                    <tr>
                    <td>Daily Hours</td>
                    ${days.map((day) => `<td>${getDailyHours(day)}</td>`).join('')}
                    </tr>
                    ${timeRange.map((time, index) => `
                    <tr>
                        <td>${time}</td>
                        ${days.map((day) => `
                        <td style="background-color:${grayOutBox(day, index) ? '#c3c4c7' : ''}">${findDayTime(day, time)}</td>
                        `).join('')}
                    </tr>
                    `).join('')}
                </table>
                </body>
                </html>
                `,
    };
    if (res.employmentType === "full-time") {
      const mailOptions = {
        from: 'jamesdominguez2020@gmail.com',
        to: email,
        subject: `Counseling Proposed Schedule`,
        text: `Hello ${res.name}! Your Schedule has been sent`,
        html: `
                      <!DOCTYPE html>
                      <html>
                      <head>
                              <style>
                              table, th, td {
                                      border: 1px solid;
                              }
                              </style>
                      </head>
                      <body>
              
                      <h1>${res.year} ${res.semester}</h1>
                      <h1>Proposed Weekly Schedule</h1>
                      <table>
                      <tr>
                      <td>Time</td>
                      ${days.map((day) => `<td>${day}</td>`).join('')}
                      </tr>
                      <tr>
                      <td>Daily Hours</td>
                      ${days.map((day) => `<td>${getDailyHours(day)}</td>`).join('')}
                      </tr>
                      ${timeRange.map((time, index) => `
                      <tr>
                          <td>${time}</td>
                          ${days.map((day) => `
                          <td style="background-color:${grayOutBox(day, index) ? '#c3c4c7' : ''}">${findDayTime(day, time)}</td>
                          `).join('')}
                      </tr>
                      `).join('')}
                  </table>
              
                  <h1>Instruction / Coord / Assign (ICA)</h1>
                  <table>
                      <tr>
                              <th>Name</th>
                              <th>A-Hour</th>
                              <th>D-Hour</th>
                      </tr>
                      ${res?.ica.map((item) => `
                      <tr>
                              <th>${item.name}</th>
                              <th>${item.aHours}</th>
                              <th>${item.dHours}</th>
                      </tr>
                      `).join('')}
                  </table>
              </body>
              </html>
              `
      };
      const adminOptions = {
        from: 'jamesdominguez2020@gmail.com',
        to: ['jamesdominguez2020@gmail.com','sashraf@chabotcollege.edu','cjethi@chabotcollege.edu'],
        subject: `${res.name} Submitted Proposed Schedule`,
        html: `
                  <!DOCTYPE html>
                  <html>
                  <head>
                  <style>
                  table, th, td {
                          border: 1px solid;
                  }
                  </style>
                  </head>
                  <body>
                      <h3>Hello! This is an automatic email notifying you that ${res.name} has submitted their schedule.</h3>
                      <h1>${res.year} ${res.semester}</h1>
                      <table>
                      <tr>
                      <td>Time</td>
                      ${days.map((day) => `<td>${day}</td>`).join('')}
                      </tr>
                      <tr>
                      <td>Daily Hours</td>
                      ${days.map((day) => `<td>${getDailyHours(day)}</td>`).join('')}
                      </tr>
                      ${timeRange.map((time, index) => `
                      <tr>
                          <td>${time}</td>
                          ${days.map((day) => `
                          <td style="background-color:${grayOutBox(day, index) ? '#c3c4c7' : ''}">${findDayTime(day, time)}</td>
                          `).join('')}
                      </tr>
                      `).join('')}
                  </table>
              
                  <h1>Instruction / Coord / Assign (ICA)</h1>
                  <table>
                      <tr>
                              <th>Name</th>
                              <th>A-Hour</th>
                              <th>D-Hour</th>
                      </tr>
                      ${res?.ica.map((item) => `
                      <tr>
                              <th>${item.name}</th>
                              <th>${item.aHours}</th>
                              <th>${item.dHours}</th>
                      </tr>
                      `).join('')}
                  </table>
                  </body>
                  </html>
                  `,
      };
      await transporter.sendMail(adminOptions);
      await transporter.sendMail(mailOptions);
    }else{
      await transporter.sendMail(adminOptionsPartTime);
      await transporter.sendMail(mailOptionsPartTime);
    }
  
    return Response.json(mongoData)
  }
  
  export async function PUT(request) {
    const res = await request.json()
    res.name = cookies().get('name').value
    res.email = cookies().get('email').value
    const db = await mongo()
    console.log(res)

    if(res.approval == "Approved"){
        await helper.sendEmail(res.email, "Proposed Schedule Update","Hello! We are pleased to inform you that your schedule has been reviewed and approved. Thank you for your prompt submission")
    }else if(res.approval == "PendingResubmission"){
        await helper.sendEmail(res.email, "Proposed Schedule Update",`Hello! We have reviewed your schedule and it requires resubmission. Please make the necessary changes and submit again using this <a href="${process.env.NEXT_PUBLIC_LINK +"/resubmission/" +res.id}">LINK</a>. Thank you.`)
    }

    const data  = await db.collection('Schedule').updateOne({_id: new mongoose.Types.ObjectId(res.id)}, {$set: {approval:res.approval}})
    console.log(data,"_updated data")
    return Response.json("Submission sent")
  }

  export async function PATCH(request) {
    const res = await request.json()
    // res.name = cookies().get('name').value
    // res.email = cookies().get('email').value
    const db = await mongo()
    // const email = await helper.sendEmail(res.email, "Proposed Schedule Resubmission","Hello! This is a automated email notifying you that we have received your schedule resubmission. Thank you for making necessary changes.")
    const data = await db.collection('Schedule').updateOne({_id: new mongoose.Types.ObjectId(res.id)}, {$set: res})
    return Response.json("Schedule Resubmitted")
  }