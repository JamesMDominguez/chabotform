import nodemailer from 'nodemailer';
import { Email } from './email';

export async function POST(req) {
  const { renderToString } = await import('react-dom/server')
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
  const emailHtml = renderToString(<Email url="https://example.com" />);
  console.log(emailHtml)
  const mailOptions = {
    from: 'jamesdominguez2020@gmail.com',
    to: email,
    subject: `Counseling Proposed Schedule`,
    text: `Hello! Your Schedule has been sent`,
    html:emailHtml
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
