import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import sgMail from "@sendgrid/mail";
import fs from "fs";
import path from "path";

// Set API key (SendGrid API uses HTTPS port 443 internally)
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  // Generate OTP
  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

  // Save OTP to Supabase
  const { error: supabaseError } = await supabase
    .from("otps")
    .insert([{ email, otp, expires_at: expiresAt }]);

  if (supabaseError) {
    return NextResponse.json({ error: supabaseError.message }, { status: 500 });
  }

  // Convert logo to Base64
  const logoPath = path.join(process.cwd(), "public", "logo.png");
  const logoBase64 = fs.readFileSync(logoPath).toString("base64");

  // HTML email content
  const htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your OTP for Password Reset</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f5f5f5;font-family:Arial,Helvetica,sans-serif;">
    <table align="center" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:40px 0;">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <tr>
              <td align="center" style="background-color:#001A33;padding:24px;">
                <img src="data:image/png;base64,${logoBase64}" alt="Edu-tech Logo" width="120" style="display:block;margin:0 auto;" />
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:40px 30px 20px;color:#333333;">
                <h2 style="margin:0 0 10px;font-size:24px;font-weight:bold;text-align:center;">Your OTP Code</h2>
                <p style="font-size:16px;line-height:1.6;text-align:center;margin:0 0 25px;">
                  Hi there 👋, use the OTP below to reset your Edu-tech password. It expires in 5 minutes.
                </p>
                <div style="text-align:center;margin-bottom:40px;">
                  <span style="
                    display:inline-block;
                    padding:20px 40px;
                    background:linear-gradient(180deg,#FF9053 0%,#DB5206 100%);
                    color:#fff;
                    font-weight:bold;
                    font-size:24px;
                    border-radius:10px;
                    letter-spacing:4px;
                  ">
                    ${otp}
                  </span>
                </div>
                <p style="font-size:14px;line-height:1.6;text-align:center;color:#666;">
                  If you didn’t request this, you can safely ignore this email.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background-color:#f9f9f9;padding:20px;text-align:center;color:#999;font-size:12px;">
                © ${new Date().getFullYear()} Edu-tech. All rights reserved.<br/>
                <a href="${process.env.NEXT_PUBLIC_APP_URL}" style="color:#DB5206;text-decoration:none;">Visit our website</a>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;

  try {
    await sgMail.send({
      to: email,
      from: process.env.EMAIL_FROM!, // verified sender
      subject: "Your OTP for Password Reset",
      html: htmlContent,
    });

    console.log(`OTP sent to ${email}: ${otp}`);
    return NextResponse.json({ success: true, message: "OTP sent to email!" });
  } catch (err: any) {
    console.error("Error sending email:", err);
    return NextResponse.json({ error: "Failed to send OTP email" }, { status: 500 });
  }
}
