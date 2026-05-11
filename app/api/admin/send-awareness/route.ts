import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/app/lib/auth";
import { createTransport } from "nodemailer";
import { join } from "path";

function isAdmin(email: string) {
  return email.toLowerCase() === process.env.EMAIL_USER?.toLowerCase();
}

function buildAwarenessEmail(name: string): string {
  const logoUrl = "cid:logo";
  const displayName = name ? name.split(" ")[0] : "there";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your wellness journey awaits — SIPA Nutrition</title>
</head>
<body style="margin:0;padding:0;background:#FAF7F2;font-family:'DM Sans',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FAF7F2;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <img src="${logoUrl}" alt="SIPA Nutrition" width="180" style="height:auto;display:block;margin:0 auto;" />
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background:#ffffff;border-radius:16px;border:1px solid rgba(0,0,0,0.08);overflow:hidden;">

              <!-- Accent stripe -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:linear-gradient(90deg,#C4541A 0%,#E8763A 100%);height:4px;"></td>
                </tr>
              </table>

              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:48px 48px 40px;">

                    <!-- Greeting -->
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-bottom:8px;">
                          <p style="margin:0;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#C4541A;font-weight:700;">
                            SIPA Nutrition · Est. 2026
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom:20px;">
                          <h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:28px;font-weight:500;color:#1C1A17;font-style:italic;line-height:1.3;">
                            Hey ${displayName}, your wellness<br/>journey is still waiting. ✦
                          </h1>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom:28px;">
                          <p style="margin:0;font-size:14px;color:#5A5245;line-height:1.7;">
                            You created your SIPA account — and that was a great first step.
                            But we noticed you haven't placed your first order yet.
                          </p>
                          <p style="margin:12px 0 0;font-size:14px;color:#5A5245;line-height:1.7;">
                            Every day without your D3+K2 is a day your body isn't running at full potential.
                            The good news? It takes just one sachet a day to change that.
                          </p>
                        </td>
                      </tr>
                    </table>

                    <!-- Product highlight box -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                      <tr>
                        <td style="background:#FAF7F2;border-radius:10px;padding:20px 24px;border:1px solid rgba(0,0,0,0.06);">
                          <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#9A8E82;font-weight:600;">What you get</p>
                          <p style="margin:0 0 12px;font-family:Georgia,serif;font-size:17px;font-weight:500;color:#1C1A17;">The Daily D3 + K2 — 30 Sachets</p>
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="font-size:12px;color:#5A5245;padding:3px 0;">✦ &nbsp;Clinically dosed Vitamin D3 + K2</td>
                            </tr>
                            <tr>
                              <td style="font-size:12px;color:#5A5245;padding:3px 0;">✦ &nbsp;100% Vegan · No fillers · No compromise</td>
                            </tr>
                            <tr>
                              <td style="font-size:12px;color:#5A5245;padding:3px 0;">✦ &nbsp;Just ≈ ₹13/day for a month of wellness</td>
                            </tr>
                          </table>
                          <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px;">
                            <tr>
                              <td>
                                <span style="font-family:Georgia,serif;font-size:26px;font-weight:700;color:#C4541A;">₹399</span>
                                <span style="font-size:14px;color:#9A8E82;text-decoration:line-through;margin-left:8px;">₹599</span>
                                <span style="font-size:11px;font-weight:700;color:#1C6B3A;background:#ECFDF5;padding:3px 8px;border-radius:4px;margin-left:8px;">33% OFF</span>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- CTA -->
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center" style="padding-bottom:28px;">
                          <a href="https://www.sipanutrition.com/productOverview"
                            style="display:inline-block;background:#C4541A;color:#ffffff;text-decoration:none;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;padding:16px 40px;border-radius:6px;">
                            Order Now &rarr;
                          </a>
                        </td>
                      </tr>
                    </table>

                    <!-- Divider + closing note -->
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="border-top:1px solid rgba(0,0,0,0.07);padding-top:24px;">
                          <p style="margin:0;font-size:12px;color:#9A8E82;line-height:1.6;font-style:italic;font-family:Georgia,serif;">
                            "Small daily habits compound into extraordinary health.<br/>You're already one step ahead — take the next one."
                          </p>
                          <p style="margin:12px 0 0;font-size:11px;color:#9A8E82;">
                            — Team SIPA Nutrition
                          </p>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top:32px;">
              <p style="margin:0 0 6px;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#9A8E82;">
                SIPA Nutrition · Est. 2026
              </p>
              <p style="margin:0;font-size:10px;color:#C4B8A8;line-height:1.6;">
                You're receiving this because you created a SIPA account.<br/>
                &copy; 2026 SIPA Nutrition. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.email || !isAdmin(session.user.email)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { email, name } = await req.json();
  if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

  const transport = createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER!,
      pass: process.env.EMAIL_PASS!,
    },
  });

  await transport.sendMail({
    to: email,
    from: `"SIPA Nutrition" <${process.env.EMAIL_USER}>`,
    subject: "Your wellness journey is still waiting ✦",
    text: `Hey ${name || "there"},\n\nYou created a SIPA account but haven't placed your first order yet.\n\nGet your Daily D3 + K2 (30 sachets) for just ₹399 — that's ≈ ₹13/day.\n\nOrder now: https://www.sipanutrition.com/productOverview\n\n— Team SIPA Nutrition`,
    html: buildAwarenessEmail(name || ""),
    attachments: [
      {
        filename: "logo.png",
        path: join(process.cwd(), "public", "logo.png"),
        cid: "logo",
      },
    ],
  });

  return NextResponse.json({ success: true });
}
