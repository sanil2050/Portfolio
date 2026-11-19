import { NextResponse } from "next/server"
import { Resend } from "resend"

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

export async function POST(request) {
  try {
    const data = await request.json()
    const { name, email, projectType, budget, engagement, message, turnstileToken } = data

    // 1. Basic input validation
    if (!name || !email || !message || message.trim().length < 10) {
      return NextResponse.json(
        { message: "Invalid input. Please provide valid name, email, and a message of at least 10 characters." },
        { status: 400 }
      )
    }

    // 2. Cloudflare Turnstile Verification (when configured)
    const turnstileSecretKey = process.env.TURNSTILE_SECRET_KEY
    if (turnstileSecretKey) {
      if (!turnstileToken) {
        return NextResponse.json(
          { message: "Security verification failed. Please refresh and try again." },
          { status: 400 }
        )
      }

      const verifyEndpoint = "https://challenges.cloudflare.com/turnstile/v0/siteverify"
      const turnstileRes = await fetch(verifyEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret: turnstileSecretKey,
          response: turnstileToken,
        }),
      })

      const turnstileData = await turnstileRes.json()

      if (!turnstileData.success) {
        return NextResponse.json(
          { message: "Failed Turnstile security check." },
          { status: 403 }
        )
      }
    }

    // 3. Check Resend API configuration
    const resendApiKey = process.env.RESEND_API_KEY
    if (!resendApiKey) {
      return NextResponse.json(
        {
          fallbackMailto: true,
          message: "Email service not configured; opening mail client.",
        },
        { status: 503 }
      )
    }

    const resend = new Resend(resendApiKey)
    const fromEmail = process.env.CONTACT_FROM_EMAIL || "Sanil Mishra Portfolio <onboarding@resend.dev>"
    const toEmail = process.env.CONTACT_TO_EMAIL || "sanilmishra010@gmail.com"
    const scopeValue = engagement || budget || "Not specified"

    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safeProjectType = escapeHtml(projectType || "Not specified")
    const safeScope = escapeHtml(scopeValue)
    const safeMessage = escapeHtml(message)
    const safePreview = escapeHtml(message.substring(0, 150))

    // 4. Send email to Admin (Sanil Mishra)
    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `New Inquiry from ${name}`,
      html: `
        <div style="font-family: 'Inter', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #ffffff; color: #1a1a1a;">
          <div style="text-align: center; margin-bottom: 40px;">
            <h1 style="font-size: 24px; font-weight: 300; letter-spacing: 2px; color: #1a1a1a; margin: 0;">NEW INQUIRY</h1>
            <div style="width: 40px; height: 2px; background-color: #000000; margin: 20px auto;"></div>
          </div>
          
          <div style="background-color: #f9f9f9; border-radius: 12px; padding: 32px; margin-bottom: 32px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 15px; line-height: 1.6;">
              <tr>
                <td style="padding-bottom: 16px; color: #666666; width: 140px;">Name</td>
                <td style="padding-bottom: 16px; font-weight: 500;">${safeName}</td>
              </tr>
              <tr>
                <td style="padding-bottom: 16px; color: #666666;">Email</td>
                <td style="padding-bottom: 16px; font-weight: 500;"><a href="mailto:${safeEmail}" style="color: #1a1a1a; text-decoration: none;">${safeEmail}</a></td>
              </tr>
              <tr>
                <td style="padding-bottom: 16px; color: #666666;">Project Type</td>
                <td style="padding-bottom: 16px; font-weight: 500;">${safeProjectType}</td>
              </tr>
              <tr>
                <td style="padding-bottom: 16px; color: #666666;">Engagement / Scope</td>
                <td style="padding-bottom: 16px; font-weight: 500;">${safeScope}</td>
              </tr>
            </table>
          </div>
          
          <div style="background-color: #f9f9f9; border-radius: 12px; padding: 32px;">
            <p style="margin: 0 0 16px 0; color: #666666; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Message</p>
            <p style="margin: 0; font-size: 15px; line-height: 1.8; white-space: pre-wrap;">${safeMessage}</p>
          </div>
        </div>
      `,
    })

    // 5. Send confirmation email to the Sender
    await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: "Thank you for reaching out!",
      html: `
        <div style="font-family: 'Inter', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #ffffff; color: #1a1a1a;">
          <div style="text-align: center; margin-bottom: 40px;">
            <h1 style="font-size: 24px; font-weight: 300; letter-spacing: 2px; color: #1a1a1a; margin: 0;">SANIL MISHRA</h1>
            <div style="width: 40px; height: 2px; background-color: #000000; margin: 20px auto;"></div>
          </div>
          
          <p style="font-size: 16px; line-height: 1.8; margin-bottom: 24px;">Hi ${safeName},</p>
          
          <p style="font-size: 16px; line-height: 1.8; margin-bottom: 24px; color: #444444;">
            Thank you for reaching out! I've successfully received your message regarding your ${projectType ? safeProjectType : "AI / engineering"} inquiry.
          </p>
          
          <p style="font-size: 16px; line-height: 1.8; margin-bottom: 40px; color: #444444;">
            I'll review your requirements carefully and get back to you within 24 hours to discuss how we can build something impactful together.
          </p>
          
          <div style="background-color: #f9f9f9; border-radius: 12px; padding: 24px; margin-bottom: 40px; border-left: 4px solid #1a1a1a;">
            <p style="margin: 0 0 12px 0; font-size: 13px; color: #666666; text-transform: uppercase; letter-spacing: 1px;">Your Message summary</p>
            <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #444444; font-style: italic;">"${safePreview}${message.length > 150 ? "..." : ""}"</p>
          </div>
          
          <p style="font-size: 16px; line-height: 1.8; margin: 0; color: #444444;">Best regards,</p>
          <p style="font-size: 16px; font-weight: 600; line-height: 1.8; margin: 4px 0 0 0;">Sanil Mishra</p>
          <p style="font-size: 14px; color: #666666; margin: 0;">AI Engineer</p>
        </div>
      `,
    })

    return NextResponse.json({ message: "Success" }, { status: 200 })
  } catch (error) {
    console.error("Error processing contact form:", error)
    return NextResponse.json(
      { message: "Error processing request", error: error.message },
      { status: 500 }
    )
  }
}
