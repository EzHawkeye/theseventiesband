export type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatMessageBody(message: string): string {
  const safe = escapeHtml(message);
  return safe.split(/\r?\n/).join("<br />");
}

export function buildContactEmailHtml({
  name,
  email,
  message,
}: ContactPayload): string {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const bodyHtml = formatMessageBody(message);

  return `<!DOCTYPE html>
<html lang="nl">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Nieuwe boeking via website</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f3e8d8;font-family:Georgia,'Times New Roman',serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f3e8d8;padding:24px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background-color:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e8d8c8;box-shadow:0 4px 24px rgba(44,36,28,0.08);">
            <tr>
              <td style="background:linear-gradient(135deg,#c45c4e 0%,#e8b923 100%);padding:20px 24px;">
                <p style="margin:0;font-size:14px;letter-spacing:0.08em;text-transform:uppercase;color:rgba(255,255,255,0.9);font-family:Arial,sans-serif;">
                  The New Seventies Band
                </p>
                <h1 style="margin:8px 0 0;font-size:22px;line-height:1.25;color:#ffffff;font-weight:700;font-family:Arial,sans-serif;">
                  Nieuwe boeking via website
                </h1>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 24px 8px;font-family:Arial,sans-serif;">
                <p style="margin:0 0 16px;font-size:15px;line-height:1.5;color:#5c5248;">
                  Iemand vulde het contactformulier in op de website.
                </p>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
                  <tr>
                    <td style="padding:12px 0;border-bottom:1px solid #f0e6d8;font-size:14px;color:#8a7f72;width:100px;vertical-align:top;font-family:Arial,sans-serif;">Naam</td>
                    <td style="padding:12px 0;border-bottom:1px solid #f0e6d8;font-size:16px;color:#2c241c;font-weight:600;font-family:Arial,sans-serif;">${safeName}</td>
                  </tr>
                  <tr>
                    <td style="padding:12px 0;border-bottom:1px solid #f0e6d8;font-size:14px;color:#8a7f72;vertical-align:top;font-family:Arial,sans-serif;">E-mail</td>
                    <td style="padding:12px 0;border-bottom:1px solid #f0e6d8;font-size:16px;color:#c45c4e;font-family:Arial,sans-serif;">
                      <a href="mailto:${safeEmail}" style="color:#c45c4e;text-decoration:none;">${safeEmail}</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 24px 24px;font-family:Arial,sans-serif;">
                <p style="margin:0 0 8px;font-size:14px;color:#8a7f72;text-transform:uppercase;letter-spacing:0.05em;">Bericht</p>
                <div style="margin:0;padding:16px;background-color:#fff8f0;border-radius:12px;border:1px solid #f0e6d8;font-size:16px;line-height:1.6;color:#2c241c;">
                  ${bodyHtml}
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:0 24px 24px;font-family:Arial,sans-serif;">
                <p style="margin:0;font-size:13px;line-height:1.5;color:#a89a8c;">
                  Je kunt direct antwoorden door te replyen op deze e-mail (reply-to staat op het adres van de bezoeker).
                </p>
              </td>
            </tr>
          </table>
          <p style="margin:16px 0 0;font-size:12px;color:#a89a8c;font-family:Arial,sans-serif;">
            Verstuurd via het contactformulier op jullie website.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
