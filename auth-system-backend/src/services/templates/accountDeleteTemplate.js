export const accountDeletedTemplate = (name, email) => {
  return `
  <!doctype html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>Account Deleted</title>
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
              <!-- Header -->
              <tr>
                <td align="center" style="padding-top: 10px">
                  <h2 style="margin: 0; color: #0f172a">
                    Account Successfully Deleted
                  </h2>
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

                  <p>
                    This is to confirm that your account has been successfully deleted.
                  </p>

                  <p>
                    You will no longer be able to access your account or any related services.
                  </p>

                  <p>
                    Some limited information may be retained for a short period where required for legal, security, or administrative purposes.
                  </p>

                  <p>
                    If this action was not initiated by you, please contact support immediately.
                  </p>
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
                  This message was sent to <b>${email}</b>.
                </td>
              </tr>

              <tr>
                <td
                  style="
                    padding-top: 10px;
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
