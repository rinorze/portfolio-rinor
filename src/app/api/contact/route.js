import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!resend) {
      console.log("Contact form submission (Resend not configured):", {
        name,
        email,
        message
      });
      return NextResponse.json({
        success: true,
        message: "Message received (email service not configured)"
      });
    }

    await resend.emails.send({
      from: "Portfolio Contact Form <onboarding@resend.dev>",
      to: "rzeqiri03@gmail.com",
      reply_to: email,
      subject: `📩 New message from ${name}`,
      text: `You received a new message from your portfolio:

Name: ${name}
Email: ${email}

Message:
${message}
      `,
      html: `
        <h2>New Portfolio Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
