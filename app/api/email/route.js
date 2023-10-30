import nodemailer from 'nodemailer';

export async function POST(request) {
    const newHeaders = new Headers(request.headers)
    const name = newHeaders.get('name')
    const email = newHeaders.get('email')
    const data = newHeaders.get('data')
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'jamesdominguez2020@gmail.com',
      pass: process.env.EMAILPASS
    }
  });

  const mailOptions = {
    from: 'jamesdominguez2020@gmail.com',
    to: email,
    subject: `Counseling Proposed Schedule`,
    text: `Hello! Here is your Proposed Schegual ${[...data]}`
  };

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  return Response.json('Email Sent')

}