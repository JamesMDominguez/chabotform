import nodemailer from 'nodemailer';

export async function POST(req) {
  const data2 = await req.json();
  const newHeaders = new Headers(req.headers);
  const email = newHeaders.get('email');

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
    text: `Hello! Your Schedule has been sent`,
    html:`
    <html>
<head>
    <style>
        .table-container {
            display: inline-block;
            margin-right: 20px;
        }
    </style>
    <title>Inline Tables with Label Rows</title>
</head>
<body>
    <div class="table-container">
        <table style="border: 1px solid #000; border-collapse: collapse;">
            <tr>
                <th colspan="2" style="background-color: #f2f2f2;">Monday</th>
            </tr>
            ${data2.schedule.map((date) => {
                if(date.day == 'Mon'){
                    return (` 
                    <tr>
                    <td style="border: 1px solid #000; padding: 8px;">${date.time}</td>
                    <td style="border: 1px solid #000; padding: 8px;">${date.option}</td>
                    </tr>
                    `);
                }
            }).join('')}
        </table>
    </div>
    
    <div class="table-container">
        <table style="border: 1px solid #000; border-collapse: collapse;">
            <tr>
                <th colspan="2" style="background-color: #f2f2f2;">Tuesday</th>
            </tr>
            ${data2.schedule.map((date) => {
                if(date.day == 'Tus'){
                    return (` 
                    <tr>
                    <td style="border: 1px solid #000; padding: 8px;">${date.time}</td>
                    <td style="border: 1px solid #000; padding: 8px;">${date.option}</td>
                    </tr>
                    `);
                }
            }).join('')}
        </table>
    </div>

    <div class="table-container">
        <table style="border: 1px solid #000; border-collapse: collapse;">
            <tr>
                <th colspan="2" style="background-color: #f2f2f2;">Wednesday</th>
            </tr>
            ${data2.schedule.map((date) => {
                if(date.day == 'Wed'){
                    return (` 
                    <tr>
                    <td style="border: 1px solid #000; padding: 8px;">${date.time}</td>
                    <td style="border: 1px solid #000; padding: 8px;">${date.option}</td>
                    </tr>
                    `);
                }
            }).join('')}
        </table>
    </div>

    <div class="table-container">
        <table style="border: 1px solid #000; border-collapse: collapse;">
            <tr>
                <th colspan="2" style="background-color: #f2f2f2;">Thursday</th>
            </tr>
            ${data2.schedule.map((date) => {
                if(date.day == 'Thurs'){
                    return (` 
                    <tr>
                    <td style="border: 1px solid #000; padding: 8px;">${date.time}</td>
                    <td style="border: 1px solid #000; padding: 8px;">${date.option}</td>
                    </tr>
                    `);
                }
            }).join('')}
        </table>
    </div>

    <div class="table-container">
        <table style="border: 1px solid #000; border-collapse: collapse;">
            <tr>
                <th colspan="2" style="background-color: #f2f2f2;">Friday</th>
            </tr>
            ${data2.schedule.map((date) => {
                if(date.day == 'Fri'){
                    return (` 
                    <tr>
                    <td style="border: 1px solid #000; padding: 8px;">${date.time}</td>
                    <td style="border: 1px solid #000; padding: 8px;">${date.option}</td>
                    </tr>
                    `);
                }
            }).join('')}
        </table>
    </div>
</body>
</html>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent');
    return Response.json('Email Sent');
  } catch (error) {
    console.error('Failed to send email:', error);
    return Response.json('Failed to send email');
  }
}
