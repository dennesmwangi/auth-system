export const accountDeletedTemplate = (name, email) => {
  return `
  <!doctype html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>Account Deleted</title>
    </head>

    <body style="margin:0; padding:0; background:#f1f5f9; font-family:Arial, sans-serif;">
      
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center" style="padding:40px 15px;">
            
            <!-- Email Container -->
            <table width="500" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:10px; padding:30px;">
              
              <!-- Title -->
              <tr>
                <td style="font-size:20px; font-weight:bold; color:#0f172a; padding-bottom:20px;">
                  Account Successfully Deleted
                </td>
              </tr>

              <!-- Body Content -->
              <tr>
                <td style="font-size:14px; color:#334155; line-height:1.7;">
                  <p style="margin:0 0 15px;">Hello <strong>${name}</strong>,</p>

                  <p style="margin:0 0 15px;">
                    This is to confirm that your account has been successfully deleted.
                  </p>

                  <p style="margin:0 0 15px;">
                    You will no longer be able to access your account or any related services.
                  </p>

                  <p style="margin:0 0 15px;">
                    Some limited information may be retained for a short period where required for legal, security, or administrative purposes.
                  </p>

                  <p style="margin:0 0 15px;">
                    If this action was not initiated by you, please contact support immediately.
                  </p>

                  <p style="margin:25px 0 0;">
                    Regards,<br/>
                    <strong>Auth System Team</strong>
                  </p>
                </td>
              </tr>

              <!-- Divider -->
              <tr>
                <td style="padding:25px 0 10px;">
                  <hr style="border:none; border-top:1px solid #e2e8f0;" />
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="font-size:12px; color:#94a3b8;">
                  This message was sent to <strong>${email}</strong>.
                </td>
              </tr>

              <tr>
                <td style="font-size:12px; color:#94a3b8; padding-top:5px;">
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
