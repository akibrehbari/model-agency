import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const LOG_PREFIX = "[api/submit-application]";

function logRouteError(context: string, err: unknown) {
  const payload: Record<string, unknown> = {
    context,
    message: err instanceof Error ? err.message : String(err),
  };
  if (err instanceof Error && err.stack) {
    payload.stack = err.stack;
  }
  if (err && typeof err === "object") {
    const o = err as Record<string, unknown>;
    if (o.response != null) payload.smtpResponse = o.response;
    if (o.responseCode != null) payload.smtpResponseCode = o.responseCode;
    if (o.code) payload.code = o.code;
    if (o.command) payload.command = o.command;
  }
  console.error(LOG_PREFIX, payload);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      fullName,
      email,
      phone,
      age,
      location,
      instagram,
      experience,
      motivation,
    } = body;

    // Validate required fields
    const required = {
      fullName,
      email,
      phone,
      age,
      location,
      experience,
      motivation,
    } as const;
    const missing = (Object.keys(required) as (keyof typeof required)[]).filter(
      (key) => !required[key]
    );
    if (missing.length > 0) {
      console.warn(LOG_PREFIX, "Validation: missing required fields", {
        missing,
      });
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.warn(LOG_PREFIX, "Validation: invalid email format");
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Check environment variables (trimmed — trailing spaces in .env are a common 535 cause)
    const smtpHost = process.env.SMTP_HOST?.trim() ?? "";
    const smtpUser = process.env.SMTP_USER?.trim() ?? "";
    // Gmail app passwords are 16 chars; the UI often shows them with spaces — strip any whitespace
    const smtpPassword = process.env.SMTP_PASSWORD?.replace(/\s/g, "") ?? "";
    const hasSmtpHost = Boolean(smtpHost);
    const hasSmtpUser = Boolean(smtpUser);
    const hasSmtpPassword = Boolean(smtpPassword);
    if (!hasSmtpHost || !hasSmtpUser || !hasSmtpPassword) {
      console.error(LOG_PREFIX, "Server configuration: missing SMTP env vars", {
        hasSmtpHost,
        hasSmtpUser,
        hasSmtpPassword,
      });
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Create transporter using SMTP
    const port = parseInt(process.env.SMTP_PORT || "587", 10);
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: port,
      secure: port === 465, // true for 465 (SSL), false for 587 (TLS)
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
    });

    // Email content
    const mailOptions = {
      from: smtpUser,
      to: process.env.EMAIL_TO || "info@cuhvet.com",
      subject: `New Model Application - ${fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #e11d48; border-bottom: 2px solid #e11d48; padding-bottom: 10px;">
            New Model Application
          </h2>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #333; margin-bottom: 15px;">Personal Information</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="background-color: #f9f9f9;">
                <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Full Name:</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${fullName}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Email:</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${email}</td>
              </tr>
              <tr style="background-color: #f9f9f9;">
                <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Phone:</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${phone}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Age:</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${age}</td>
              </tr>
              <tr style="background-color: #f9f9f9;">
                <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Location:</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${location}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Instagram:</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${instagram || "Not provided"}</td>
              </tr>
              <tr style="background-color: #f9f9f9;">
                <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Experience:</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${experience}</td>
              </tr>
            </table>
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #333; margin-bottom: 10px;">Motivation</h3>
            <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #e11d48; border-radius: 4px;">
              <p style="margin: 0; color: #555; line-height: 1.6;">${motivation}</p>
            </div>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #999; font-size: 12px;">
            <p>Submitted on: ${new Date().toLocaleString()}</p>
            <p>From: <a href="https://ads.cuhvet.com" style="color: #e11d48;">ads.cuhvet.com</a></p>
          </div>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Application submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.warn(LOG_PREFIX, "Invalid JSON in request body", {
        message: error.message,
      });
    } else {
      logRouteError("Unhandled error while submitting application", error);
    }
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 }
    );
  }
}
