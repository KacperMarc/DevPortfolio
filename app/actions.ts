"use server"

import nodemailer from "nodemailer"

export async function sendEmail(formData: FormData) {
  // Get form data
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const subject = formData.get("subject") as string
  const message = formData.get("message") as string

  // Validate form data
  if (!name || !email || !subject || !message) {
    return {
      success: false,
      error: "Please fill out all fields.",
    }
  }

  if (!email.includes("@")) {
    return {
      success: false,
      error: "Please enter a valid email address.",
    }
  }

  try {
    // Create a transporter
    // Note: In production, you should use environment variables for these values
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.example.com",
      port: Number.parseInt(process.env.EMAIL_PORT || "587"),
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER || "your-email@example.com",
        pass: process.env.EMAIL_PASSWORD || "your-password",
      },
    })

    // Email content
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER || "your-email@example.com"}>`,
      to: process.env.EMAIL_RECIPIENT || "your-email@example.com",
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      text: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
      `,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #333;">New Contact Form Submission</h2>
  <p><strong>Name:</strong> ${name}</p>
  <p><strong>Email:</strong> ${email}</p>
  <p><strong>Subject:</strong> ${subject}</p>
  <div style="margin-top: 20px;">
    <p><strong>Message:</strong></p>
    <p style="white-space: pre-line;">${message}</p>
  </div>
</div>
      `,
    }

    // Send email
    await transporter.sendMail(mailOptions)

    return {
      success: true,
    }
  } catch (error) {
    console.error("Error sending email:", error)
    return {
      success: false,
      error: "Failed to send email. Please try again later.",
    }
  }
}
