// app/api/contact/route.js
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    // Send email with Resend
    await resend.emails.send({
      from: "Portfolio Contact Form <onboarding@resend.dev>",
      to: "rzeqiri03@gmail.com", // your inbox
      reply_to: email, // 👈 lets you reply directly to the sender
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
