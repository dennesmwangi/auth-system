export const resetCodeTemplate = (name, code, codeExpirytime, email) => {
  return `
  <!doctype html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>Reset Your Password</title>
    </head>

    <body
      style="
        margin: 0;
        padding: 0;
        background: #f1f5f9;
        font-family: Arial, sans-serif;
      "
    >
      <table width="100%" cellpadding="0" cellspacing="0" style="padding: 20px 0">
        <tr>
          <td align="center">
            <table
              width="420"
              cellpadding="0"
              cellspacing="0"
              style="
                background: #ffffff;
                border-radius: 12px;
                padding: 30px;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
              "
            >
              <tr>
                <td align="center" style="padding-top: 10px">
                  <h2 style="margin: 0; color: #0f172a">Password Reset Code</h2>
                </td>
              </tr>

              <!-- Message -->
              <tr>
                <td
                  style="
                    padding-top: 15px;
                    color: #475569;
                    font-size: 14px;
                    line-height: 1.6;
                    text-align: center;
                  "
                >
                  <p>Hello <b>${name}</b>,</p>
                  <p>Use the code below to reset your password. If you didn't request a password reset, you can ignore this email.</p>
                  <h1 style="letter-spacing: 6px;">${code}</h1>
                </td>

              <!-- Expiry -->
              <tr>
                <td style="color: #64748b; font-size: 13px; text-align: center">
                  This code will expire in <b>${codeExpirytime} minutes</b>.
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td
                  style="
                    padding-top: 25px;
                    font-size: 12px;
                    color: #94a3b8;
                    text-align: center;
                  "
                >
                  This message was sent to <b>${email}</b> because you requested a password reset. If you didn’t request this, you can safely ignore this email. Also, please do not share this code with anyone else.
                </td>
              </tr>
              <tr>
                <td
                  style="
                    padding-top: 25px;
                    font-size: 12px;
                    color: #94a3b8;
                    text-align: center;
                  "
                >
                  &copy; ${new Date().getFullYear()} Auth System. All rights reserved.
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
};
