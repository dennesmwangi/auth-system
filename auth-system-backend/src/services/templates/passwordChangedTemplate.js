export function getPasswordChangedEmailTemplate({
  name,
  timestamp,
  ipAddress,
  deviceInfo,
  location,
  email,
}) {
  const formattedTime = new Date(timestamp).toLocaleString();

  return `
  <!doctype html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>Password Changed</title>
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
                  <h2 style="margin: 0; color: #0f172a">Password Changed</h2>
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
                  <p>Your password was successfully changed.</p>
                </td>
              </tr>

              <!-- Details Box -->
              <tr>
                <td style="padding-top: 20px">
                  <table
                    width="100%"
                    cellpadding="0"
                    cellspacing="0"
                    style="
                      background: #f8fafc;
                      border-radius: 8px;
                      padding: 15px;
                      border: 1px solid #e2e8f0;
                    "
                  >
                    <tr>
                      <td style="padding-bottom: 8px">
                        <strong style="color: #64748b; font-size: 12px;">TIME</strong><br/>
                        <span style="color: #0f172a; font-size: 14px;">${formattedTime}</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-bottom: 8px">
                        <strong style="color: #64748b; font-size: 12px;">IP ADDRESS</strong><br/>
                        <span style="color: #0f172a; font-size: 14px;">${ipAddress}</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-bottom: 8px">
                        <strong style="color: #64748b; font-size: 12px;">DEVICE</strong><br/>
                        <span style="color: #0f172a; font-size: 14px;">${deviceInfo}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong style="color: #64748b; font-size: 12px;">LOCATION</strong><br/>
                        <span style="color: #0f172a; font-size: 14px;">${location}</span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Warning -->
              <tr>
                <td
                  style="
                    padding-top: 20px;
                    color: #dc2626;
                    font-size: 13px;
                    text-align: center;
                    background: #fef2f2;
                    padding: 12px;
                    border-radius: 8px;
                  "
                >
                  If this wasn't you, please reset your password immediately.
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
                  This message was sent to <b>${email}</b> because your password was changed.
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
}
