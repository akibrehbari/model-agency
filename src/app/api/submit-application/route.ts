import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const LOG_PREFIX = "[api/submit-application]";

// Image upload constraints (must mirror the client form)
const MAX_PHOTOS = 5;
const MAX_PHOTO_BYTES = 5 * 1024 * 1024; // 5 MB per file
const MAX_TOTAL_BYTES = 25 * 1024 * 1024; // 25 MB combined
const ACCEPTED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
]);

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

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

type ParsedFields = {
  fullName: string;
  email: string;
  phone: string;
  age: string;
  location: string;
  instagram: string;
  experience: string;
  motivation: string;
};

async function parseRequest(
  request: NextRequest
): Promise<{ fields: ParsedFields; photos: File[] } | null> {
  const contentType = request.headers.get("content-type") || "";

  if (contentType.includes("multipart/form-data")) {
    const form = await request.formData();
    const get = (key: string) => {
      const v = form.get(key);
      return typeof v === "string" ? v : "";
    };

    const photoEntries = form.getAll("photos");
    const photos: File[] = [];
    for (const entry of photoEntries) {
      if (entry instanceof File && entry.size > 0) {
        photos.push(entry);
      }
    }

    return {
      fields: {
        fullName: get("fullName"),
        email: get("email"),
        phone: get("phone"),
        age: get("age"),
        location: get("location"),
        instagram: get("instagram"),
        experience: get("experience"),
        motivation: get("motivation"),
      },
      photos,
    };
  }

  if (contentType.includes("application/json")) {
    const body = await request.json();
    return {
      fields: {
        fullName: String(body?.fullName ?? ""),
        email: String(body?.email ?? ""),
        phone: String(body?.phone ?? ""),
        age: String(body?.age ?? ""),
        location: String(body?.location ?? ""),
        instagram: String(body?.instagram ?? ""),
        experience: String(body?.experience ?? ""),
        motivation: String(body?.motivation ?? ""),
      },
      photos: [],
    };
  }

  return null;
}

export async function POST(request: NextRequest) {
  try {
    const parsed = await parseRequest(request);
    if (!parsed) {
      return NextResponse.json(
        { error: "Unsupported content type" },
        { status: 415 }
      );
    }

    const { fields, photos } = parsed;
    const {
      fullName,
      email,
      phone,
      age,
      location,
      instagram,
      experience,
      motivation,
    } = fields;

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

    // Validate photos (server-side, defensive — UI already enforces these)
    if (photos.length > MAX_PHOTOS) {
      return NextResponse.json(
        { error: `You can upload up to ${MAX_PHOTOS} photos.` },
        { status: 400 }
      );
    }
    let totalBytes = 0;
    for (const file of photos) {
      const looksLikeImage =
        ACCEPTED_IMAGE_TYPES.has(file.type) ||
        /\.(jpe?g|png|webp|heic|heif)$/i.test(file.name);
      if (!looksLikeImage) {
        return NextResponse.json(
          { error: "Only JPG, PNG, WEBP, or HEIC images are allowed." },
          { status: 400 }
        );
      }
      if (file.size > MAX_PHOTO_BYTES) {
        return NextResponse.json(
          { error: "One of the photos exceeds the 5 MB size limit." },
          { status: 400 }
        );
      }
      totalBytes += file.size;
    }
    if (totalBytes > MAX_TOTAL_BYTES) {
      return NextResponse.json(
        { error: "Combined photo size exceeds the 25 MB limit." },
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

    // Build attachments from uploaded photos
    const attachments: nodemailer.SendMailOptions["attachments"] = [];
    for (const file of photos) {
      const buffer = Buffer.from(await file.arrayBuffer());
      attachments.push({
        filename: file.name || "photo",
        content: buffer,
        contentType: file.type || "application/octet-stream",
      });
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

    const photosRowHtml =
      photos.length > 0
        ? `
              <tr style="background-color: #f9f9f9;">
                <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Photos:</td>
                <td style="padding: 10px; border: 1px solid #ddd;">
                  ${photos.length} attached (${photos
                    .map((f) => escapeHtml(f.name))
                    .join(", ")})
                </td>
              </tr>`
        : "";

    // Email content
    const mailOptions = {
      from: smtpUser,
      to: process.env.EMAIL_TO || "info@cuhvet.com",
      replyTo: email,
      subject: `New Model Application - ${fullName}`,
      attachments,
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
                <td style="padding: 10px; border: 1px solid #ddd;">${escapeHtml(fullName)}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Email:</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${escapeHtml(email)}</td>
              </tr>
              <tr style="background-color: #f9f9f9;">
                <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Phone:</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${escapeHtml(phone)}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Age:</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${escapeHtml(age)}</td>
              </tr>
              <tr style="background-color: #f9f9f9;">
                <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Location:</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${escapeHtml(location)}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Instagram:</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${escapeHtml(instagram || "Not provided")}</td>
              </tr>
              <tr style="background-color: #f9f9f9;">
                <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Experience:</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${escapeHtml(experience)}</td>
              </tr>${photosRowHtml}
            </table>
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #333; margin-bottom: 10px;">Motivation</h3>
            <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #e11d48; border-radius: 4px;">
              <p style="margin: 0; color: #555; line-height: 1.6;">${escapeHtml(motivation)}</p>
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
