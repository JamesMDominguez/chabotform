
const sendEmail = async (emailRecipient, subject, html) => {
    const apiUrl = `${process.env.NEXT_PUBLIC_LINK}/api/email`;

    const email = await fetch(apiUrl, {
      method: 'PUT',
      body: JSON.stringify({
        emailRecipient: emailRecipient, 
        subject: subject, 
        html: html
      }),
    });
    return email;
  }
  



export default { sendEmail }