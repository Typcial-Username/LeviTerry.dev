import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

type Data = {
  message?: string;
  success: boolean;
};

export default async function Handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { data } = req.body;

  if (!data.name || !data.email || !data.message /*|| !body.token*/) {
    return res.status(400).json({
      message: 'Missing "name", "email", "message", or "token" field',
      success: false,
    });
  }

  try {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.GOOGLE_EMAIL,
      pass: process.env.GOOGLE_APP_PASSWORD
    }
  });

  await transporter.sendMail({
    from: `"${data.name}" <${process.env.GOOGLE_EMAIL}>`,
    subject: `New message from ${data.name} via contact form`,
    to: process.env.PORTFOLIO_EMAIL,
    text: data.message,
    html: `<p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Subject:</strong> ${data.subject ? data.subject : 'No Subject Specified'}</p>
          <p><strong>Message</strong>:</p>
          <p>${data.message}</p>
          <br />
          <button style="background-color: #4CAF50; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">Send Reply</button>
          `
  })

  res.status(200).json({message: "Email sent successfully", success: true});
} catch (error) {
  console.error("Error creating transporter:", error);
  return res.status(500).json({
    message: "Failed to create email transporter",
    success: false,
  });
}

  res.status(200).json({ success: true });
}
