import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import Nodemailer from "next-auth/providers/nodemailer";
import { createTransport } from "nodemailer";
import { join } from "path";
import clientPromise from "./mongodb";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
    };
  }
}

function buildVerificationEmail(url: string, email: string): string {
  const logoUrl = "cid:logo";
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Sign in to SIPA Nutrition</title>
</head>
<body style="margin:0;padding:0;background:#FAF7F2;font-family:'DM Sans',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FAF7F2;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

          <!-- Logo / Brand bar -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <p style="margin:0;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:#C4541A;font-weight:700;">
                SIPA Nutrition
              </p>
              <p style="margin:4px 0 0;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#9A8E82;">
                Daily Vitamin D3 + K2
              </p>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background:#ffffff;border-radius:16px;border:1px solid rgba(0,0,0,0.08);overflow:hidden;">

              <!-- Top accent stripe -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:linear-gradient(90deg,#C4541A 0%,#E8763A 100%);height:4px;"></td>
                </tr>
              </table>

              <!-- Body -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:48px 48px 40px;">

                    <!-- Logo -->
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center" style="padding-bottom:28px;">
                          <img src="${logoUrl}" alt="SIPA Nutrition" width="120" style="height:auto;display:block;margin:0 auto;" />
                        </td>
                      </tr>
                    </table>

                    <!-- Headline -->
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center" style="padding-bottom:12px;">
                          <h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:28px;font-weight:500;color:#1C1A17;font-style:italic;line-height:1.2;">
                            Your link is ready.
                          </h1>
                        </td>
                      </tr>
                      <tr>
                        <td align="center" style="padding-bottom:32px;">
                          <p style="margin:0;font-size:14px;color:#5A5245;line-height:1.6;max-width:380px;">
                            One click is all it takes. Tap the button below to securely sign in to your SIPA account — no password needed, ever.
                          </p>
                        </td>
                      </tr>
                    </table>

                    <!-- CTA Button -->
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center" style="padding-bottom:32px;">
                          <a href="${url}"
                            style="display:inline-block;background:#C4541A;color:#ffffff;text-decoration:none;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;padding:16px 40px;border-radius:6px;">
                            Sign In to SIPA &rarr;
                          </a>
                        </td>
                      </tr>
                    </table>

                    <!-- Divider -->
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="border-top:1px solid rgba(0,0,0,0.07);padding-top:28px;padding-bottom:20px;">
                          <p style="margin:0;font-size:11px;color:#9A8E82;text-align:center;line-height:1.6;">
                            This link was sent to <strong style="color:#5A5245;">${email}</strong><br/>
                            It expires in <strong style="color:#5A5245;">24 hours</strong> and can only be used once.
                          </p>
                        </td>
                      </tr>
                    </table>

                    <!-- Fallback URL -->
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="background:#FAF7F2;border-radius:8px;padding:14px 18px;">
                          <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:#9A8E82;font-weight:600;">
                            Button not working?
                          </p>
                          <p style="margin:0;font-size:11px;color:#C4541A;word-break:break-all;line-height:1.5;">
                            ${url}
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
                If you didn&apos;t request this email, you can safely ignore it.<br/>
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

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    Nodemailer({
      server: {
        host: "smtp.hostinger.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER!,
          pass: process.env.EMAIL_PASS!,
        },
      },
      from: `"SIPA Nutrition" <${process.env.EMAIL_USER}>`,
      async sendVerificationRequest({ identifier: email, url, provider }) {
        const transport = createTransport(provider.server);
        await transport.sendMail({
          to: email,
          from: provider.from,
          subject: "Your sign-in link for SIPA Nutrition",
          text: `Sign in to SIPA Nutrition\n\nClick this link to sign in:\n${url}\n\nThis link expires in 24 hours and can only be used once.\n\nIf you didn't request this, you can safely ignore this email.`,
          html: buildVerificationEmail(url, email),
          attachments: [
            {
              filename: "logo.png",
              path: join(process.cwd(), "public", "logo.png"),
              cid: "logo",
            },
          ],
        });
      },
    }),
  ],
  callbacks: {
    session({ session, user }) {
      if (session.user && user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
    verifyRequest: "/auth/verify",
  },
});
