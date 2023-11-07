import nodemailer from 'nodemailer';

export async function POST(req) {
  const data2 = await req.json();
  const newHeaders = new Headers(req.headers);
  const email = newHeaders.get('email');
  const timeRange = ["8:00am", "8:30am", "9:00am", "9:30am", "10:00am", "10:30am", "11:00am", "11:30am", "12:00pm", "12:30pm", "1:00pm", "1:30pm", "2:00pm", "2:30pm", "3:00pm", "3:30pm", "4:00pm", "4:30pm", "5:00pm", "5:30pm", "6:00pm", "6:30pm", "7:00pm"]
  const days = ["Mon", "Tues", "Wed", "Thurs", "Fri"]
  
  function grayOutBox(day, index) {
    if (index < 2) return true;
    if (day == "Mon" && index > 17) return true;
    if (day == "Wed" && index > 9 && index < 14) return true;
    if (day == "Thurs" && index > 17) return true;
    if (day == "Fri" && index > 17) return true;
    return false;
  }

  const findDayTime = (Day, Time) => {
    let x = data2?.schedule?.map((date) => {
      if (date.day == Day && date.time == Time) {
        return (date.option)
      } else {
        return ""
      }
    }).join('')
    return (x)
  }

  const getDailyHours = (day) => {
    let num = 0
    data2?.schedule?.forEach((time) => {
      if (time.day == day) {
        num++
      }
    })
    return num / 2
  }


  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'jamesdominguez2020@gmail.com',
      pass: process.env.EMAILPASS,
    },
  });
  console.log(data2.schedule)
  const mailOptions = {
    from: 'jamesdominguez2020@gmail.com',
    to: email,
    subject: `Counseling Proposed Schedule`,
    text: `Hello! Your Schedule has been sent`,
    html:`
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
    <h1>Proposed Weekly Schedule</h1>
    <table>
    <tr>
    <td>Time</td>
    ${days.map((i) => `
    <td>${i}</td>
    `).join('')}
    </tr>
    <tr>
    <td>Daily Hours</td>
    ${days.map((i) => `
    <td>${getDailyHours(i)}</td>
    `).join('')}
    </tr>
    
    ${timeRange.map((i,index)=>`
    <tr>
      <td>${i}</td>
      ${days.map((day) => `
      <td style="background-color:${grayOutBox(day, index) ? '#c3c4c7' : ''}">${findDayTime(day, i)}</td>
      `).join('')}
    </tr>
    `).join('')}
  </table>
</body>
</html>
`};

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent');
    return Response.json('Email Sent');
  } catch (error) {
    console.error('Failed to send email:', error);
    return Response.json('Failed to send email');
  }
}
