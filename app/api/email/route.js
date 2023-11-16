import nodemailer from 'nodemailer';
import Fun from '../../utils/myFunc'

export async function POST(req) {
  const data2 = await req.json();
  const newHeaders = new Headers(req.headers);
  const email = newHeaders.get('email');
  const dataHeader = newHeaders.get('data');
  const timeRange = ["8:00am", "8:30am", "9:00am", "9:30am", "10:00am", "10:30am", "11:00am", "11:30am", "12:00pm", "12:30pm", "1:00pm", "1:30pm", "2:00pm", "2:30pm", "3:00pm", "3:30pm", "4:00pm", "4:30pm", "5:00pm", "5:30pm", "6:00pm", "6:30pm", "7:00pm"]
  const days = ["Mon", "Tues", "Wed", "Thurs", "Fri"]
  const grayOutBox = Fun.grayOutBox

  const findDayTime = (Day, Time) => {
    let x = data2?.schedule?.map((date) => {
      if (date.day == Day && date.time == Time) {
        return (date.option)
      } else {
        return ""
      }
    }).join('')
    if(x == ''){
        let val = data2?.breaks.map((date) => {
            if (date.day == Day && date.time == Time) {
              return ("Break")
            } else {
              return ""
            }
          }).join('')
        return val
    }
    return (x)
  }  
  const getDailyHours = Fun.getDailyHours

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'jamesdominguez2020@gmail.com',
      pass: process.env.EMAILPASS,
    },
  });

  const mailOptions = {
    from: 'jamesdominguez2020@gmail.com',
    to: email,
    subject: `Counseling Proposed Schedule`,
    text: `Hello ${data2.name}! Your Schedule has been sent`,
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

    <h1>${data2.year+" "+data2.semester}</h1>
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

  <h1>Instruction / Coord / Assign (ICA)</h1>
  <table>
    <tr>
        <th>Name</th>
        <th>A-Hour</th>
        <th>D-Hour</th>
    </tr>
    ${data2?.ica.map((i)=>`
    <tr>
        <th>${i.name}</th>
        <th>${i.aHours}</th>
        <th>${i.dHours}</th>
    </tr>
    `).join('')}
  </table>
  <h2>A link to your schedule can be found in this <a href="${process.env.NEXTAUTH_URL+dataHeader}">LINK</a>
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
