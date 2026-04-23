import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import notify from "@/app/models/notify";
import { connectDB } from "@/app/lib/db";
import { sendMail } from "@/app/lib/sendMail";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectDB();
    const { name, email, phone } = body;

    // Validation
    if (!name || !email) {
      return NextResponse.json(
        { message: "All fields are mandatory" },
        { status: 400 }
      );
    }

    // Check existing user
    const existingUser = await notify.findOne({ email });
    if (existingUser) {
      console.log("User with same email already exists:", existingUser.email);
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 }
      );
    }

    // Save new user
    const newEntry = new notify({ name, email });
    const save = await newEntry.save();

    const notifyCount = await notify.countDocuments();

    console.log("Total notifications saved:", notifyCount);
    console.log("User saved:", {
      name: save.name,
      email: save.email,
      count: notifyCount,
    });

    // Read email template
    const templatePath = path.join(
      process.cwd(),
      "app/templates/WelcomeEmail.html"
    );
    let htmlTemplate = fs.readFileSync(templatePath, "utf8");

    htmlTemplate = htmlTemplate
      .replace(/{{\s*name\s*}}/g, name)
      .replace(/{{\s*email\s*}}/g, email)
      .replace(/{{\s*count\s*}}/g, notifyCount.toString());

    // Send email
        // 🔥 Send both emails in parallel
    await Promise.all([
      // User email
      sendMail({
        to: email,
        subject: "You're on the list 🚀",
        html: htmlTemplate,
      }),

      // Admin email (YOU)
      sendMail({
        to: process.env.EMAIL_USER, // your email
        subject: "🔥 New Warrior Joined SIPA",
        html: `
          <div style="font-family:Arial;padding:20px;">
            <h2 style="color:#c2410c;">🔥 New SIPA Signup</h2>
            
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
            
            <hr style="margin:20px 0;" />
            
            <p>📊 Total Waitlist Count: <strong>${notifyCount}</strong></p>
          </div>
        `,
      }),
    ]);
    return NextResponse.json(
      {
        success: true,
        data: { name, email, notifyCount },
        message: "User Successfully Registered.",
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { message: err?.message || "Something went wrong" },
      { status: 400 }
    );
  }
}