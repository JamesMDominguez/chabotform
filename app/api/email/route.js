import nodemailer from 'nodemailer';

export async function POST(req) {
    try {
        const data = await req.json();
        const { headers } = req;
        const email = headers.get('email');
        const dataHeader = headers.get('data');
        const timeRange = [
            "8:00am", "8:30am", "9:00am", "9:30am", "10:00am", "10:30am", "11:00am", "11:30am",
            "12:00pm", "12:30pm", "1:00pm", "1:30pm", "2:00pm", "2:30pm", "3:00pm", "3:30pm",
            "4:00pm", "4:30pm", "5:00pm", "5:30pm", "6:00pm", "6:30pm", "7:00pm"
        ];
                const days = ["Mon", "Tues", "Wed", "Thurs", "Fri"];

                const getDailyHours = (day) => {
                    let count = 0;
                    data?.schedule?.forEach((time) => {
                        if (time.day === day) {
                            count++;
                        }
                    });
                    return count / 2;
                };

                const findDayTime = (day, time) => {
                    let result = data?.schedule?.map((date) => {
                        if (date.day === day && date.time === time) {
                            return date.option;
                        } else {
                            return "";
                        }
                    }).join('');

                    if (result === '') {
                        result = data?.breaks.map((date) => {
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

                const mailOptions = {
                    from: 'jamesdominguez2020@gmail.com',
                    to: email,
                    subject: `Counseling Proposed Schedule`,
                    text: `Hello ${data.name}! Your Schedule has been sent`,
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
                
                        <h1>${data.year} ${data.semester}</h1>
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
                        ${data?.ica.map((item) => `
                        <tr>
                                <th>${item.name}</th>
                                <th>${item.aHours}</th>
                                <th>${item.dHours}</th>
                        </tr>
                        `).join('')}
                    </table>
                    <h2>A link to your schedule can be found in this <a href="${process.env.NEXTAUTH_URL + dataHeader}">LINK</a>
                </body>
                </html>
                `
                };

                const adminOptions = {
                    from: 'jamesdominguez2020@gmail.com',
                    to: ['sashraf@chabotcollege.edu','cjethi@chabotcollege.edu'],
                    subject: `${data.name} Submitted Proposed Schedule`,
                    html: `
                    <!DOCTYPE html>
                    <html>
                    <head>
                    </head>
                    <body>
                        <h3>Hello! This is an automatic email notifying you that ${data.name} has submitted their schedule.</h3>
                        <h1>${data.year} ${data.semester}</h1>
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
                        ${data?.ica.map((item) => `
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
                console.log('Email sent');
                return Response.json('Email Sent');
            } catch (error) {
                console.error('Failed to send email:', error);
                return Response.json('Failed to send email');
            }
        }
