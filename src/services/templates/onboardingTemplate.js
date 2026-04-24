export const onboardingTemplate = (name, email) => {
  return `
  <!doctype html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>Welcome to Our Platform!</title>
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
                  <h2 style="margin: 0; color: #0f172a">🎉 Welcome to Our Platform!</h2>
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
                  <p>Hi <b>${name}</b> 👋</p>
                  <p>We're thrilled to have you on board! 🎉 Get ready to explore all the amazing features we have in store for you.</p>
                  <p>If you have any questions, feel free to reach out — we're always happy to help!</p>
                </td>

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
                  This message was sent to <b>${email}</b> because you joined our platform. We're excited to have you with us!
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
