import nodemailer from 'nodemailer';

export async function PUT(request) {
  const res = await request.json()

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'jamesdominguez2020@gmail.com',
      pass: process.env.EMAILPASS,
    },
  });

  const mailOptions = {
    from: 'jamesdominguez2020@gmail.com',
    to: res.emailRecipient,
    subject: res.subject,
    html: `
    <!DOCTYPE html>
    <html>
    <head>
    <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f2f2f2;
      text-align: center;
    }
    
    .container {
      max-width: 600px;
      margin: 0 auto;
      margin-top: 50px;
      padding: 20px;
      background-color: #ffffff;
      border-radius: 5px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
    
    h3 {
      color: #333333;
    }

    </style>
    </head>
    <body>
    <div class="container">
        <h3>${res.html}</h3>
    </div>
    </body>
    </html>
    `};

    try {
        const email = await transporter.sendMail(mailOptions);
        console.log('Email sent');
        return Response.json(email)
    } catch (error) {
        console.error('Failed to send email:', error);
        return Response.json(error)
    }
}


