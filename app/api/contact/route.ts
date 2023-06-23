import sgMail from '@sendgrid/mail';
import { NextResponse } from 'next/server';

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export async function POST(req: Request) {
  const { subject, email, message, name } = await req.json();
  if (!email) {
   return new Response( 'error: Email is required' );
    
  }

  const msg = {
    to: email,
    cc: process.env.FROM_EMAIL as string,
    from: process.env.FROM_EMAIL as string,
    subject: 'Contact form submission from RandalHerndon.com',
    text: 'New Message from Randal',
    html: `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Submission for RandalHerndon.com</title>
        <style>
        /* Reset styles to ensure consistent rendering across email clients */
        body,
        html {
          margin: 0;
          padding: 0;
          border: 0;
          font-size: 100%;
          font: inherit;
          vertical-align: baseline;
          line-height: 1;
        }
  
        /* Set the width of the email to be the maximum width */
        body {
          max-width: 600px;
          margin: 0 auto;
        }
  
        /* Center the image in the header */
        .header img {
          display: block;
          margin: 0 auto;
        }
  
        /* Style the footer */
        .footer {
          margin-top: 2rem;
          text-align: center;
          font-size: 0.8rem;
          color: #666;
        }
  
        .footer a {
          color: #666;
          text-decoration: none;
        }
  
        /* Style the content of the email */
        .content {
          padding: 1rem;
          background-color: #f5f5f5;
        }
  
        .content h1 {
          margin-top: 0;
          margin-bottom: 1rem;
          font-size: 1.5rem;
          font-weight: bold;
          color: #333;
        }
  
        .content p {
          margin: 0;
          margin-bottom: 1rem;
          font-size: 1rem;
          line-height: 1.5;
          color: #666;
        }
      </style>
      </head>
      <body>
    
        <div class="content">
          <h1>New Message for Randal Herndon</h1>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong>${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong> ${message}</p>
        </div>
        <div class="footer">
          <p>&copy; 2023 The CRIB. All rights reserved.</p>
          <p><a href="https://randalherndon.com/">Randal Herndon</a></p>
        </div>
      </body>
    </html>
    
    `,
  };

  try {
    await sgMail.send(msg);
    console.log('Email sent');
    new Response('success: true')
  } catch (error) {
    console.error(error);
    new Response('error: Error sending email')
  }
}
