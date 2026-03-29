import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  const { name, email, phone, inquiry_type, message } = await request.json();

  if (!name || !email || !inquiry_type || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Save to Supabase
  const { error: dbError } = await supabase.from("contact_submissions").insert({
    name,
    email,
    phone: phone || null,
    inquiry_type,
    message,
  });

  if (dbError) {
    console.error("Supabase error:", dbError);
    return NextResponse.json({ error: "Failed to save submission" }, { status: 500 });
  }

  // Send email via Resend
  const { error: emailError } = await resend.emails.send({
    from: "Freya Pilates <noreply@freyapilates.com>",
    to: process.env.CONTACT_EMAIL_TO!,
    replyTo: email,
    subject: `New Inquiry: ${inquiry_type} — ${name}`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #2A2A2A;">
        <div style="border-bottom: 2px solid #B89A6F; padding-bottom: 20px; margin-bottom: 30px;">
          <h1 style="font-size: 28px; letter-spacing: 4px; margin: 0; text-transform: uppercase;">Freya Pilates</h1>
          <p style="font-size: 11px; letter-spacing: 3px; color: #B89A6F; text-transform: uppercase; margin: 4px 0 0;">New Contact Inquiry</p>
        </div>

        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #EDE8DC; width: 140px;">
              <span style="font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #6B7A4F;">Name</span>
            </td>
            <td style="padding: 10px 0; border-bottom: 1px solid #EDE8DC; font-size: 15px;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #EDE8DC;">
              <span style="font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #6B7A4F;">Email</span>
            </td>
            <td style="padding: 10px 0; border-bottom: 1px solid #EDE8DC; font-size: 15px;">
              <a href="mailto:${email}" style="color: #6B7A4F;">${email}</a>
            </td>
          </tr>
          ${
            phone
              ? `<tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #EDE8DC;">
              <span style="font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #6B7A4F;">Phone</span>
            </td>
            <td style="padding: 10px 0; border-bottom: 1px solid #EDE8DC; font-size: 15px;">${phone}</td>
          </tr>`
              : ""
          }
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #EDE8DC;">
              <span style="font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #6B7A4F;">Inquiry</span>
            </td>
            <td style="padding: 10px 0; border-bottom: 1px solid #EDE8DC; font-size: 15px;">${inquiry_type}</td>
          </tr>
        </table>

        <div style="margin-top: 30px;">
          <p style="font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #6B7A4F; margin-bottom: 10px;">Message</p>
          <p style="font-size: 15px; line-height: 1.7; background: #F8F5EF; padding: 20px; margin: 0;">${message.replace(/\n/g, "<br>")}</p>
        </div>

        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #EDE8DC;">
          <p style="font-size: 11px; color: #9A9A9A; text-align: center;">
            Freya Pilates · Calistoga, California
          </p>
        </div>
      </div>
    `,
  });

  if (emailError) {
    console.error("Resend error:", emailError);
    // Don't fail the request — submission was saved to DB
  }

  return NextResponse.json({ success: true });
}
