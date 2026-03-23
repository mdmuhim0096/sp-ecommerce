const { clientUrl } = require("../helper/utils");
const transporter = require("./transporter");
const link = `${clientUrl}/productViewByIdLink`;

async function sendOrderEmail(products, userName, email, orderId) {
  try {

    const total = products.reduce((sum, p) => sum + Number(p.price), 0);

    const customerProducts = products.map(p => `
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="80" style="vertical-align:middle;">
                <img src="${p.image}" alt="${p.name}" width="70" height="70"
                  style="display:block;width:70px;height:70px;object-fit:cover;border-radius:8px;" />
              </td>
              <td style="padding-left:12px;vertical-align:middle;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
                <p style="margin:0 0 4px 0;font-size:15px;font-weight:600;color:#1a1a2e;">${p.name}</p>
                <p style="margin:0;font-size:13px;color:#888;">Qty: ${p.quantity}</p>
              </td>
              <td align="right" style="vertical-align:middle;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
                <span style="font-size:15px;font-weight:700;color:#00c2a8;">$${Number(p.price).toFixed(2)}</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    `).join("");

    const customerHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>Order Confirmation – Shopora</title>
  <style>
    @media only screen and (max-width: 600px) {
      .email-wrapper { padding: 12px !important; }
      .email-card   { padding: 20px 16px !important; border-radius: 8px !important; }
      .header-cell  { padding: 18px 16px !important; border-radius: 6px !important; }
      .header-title { font-size: 20px !important; }
      .greeting-cell{ padding: 16px 0 !important; }
      .product-img  { width: 56px !important; height: 56px !important; }
      .product-name { font-size: 14px !important; }
      .product-price{ font-size: 14px !important; }
      .total-row td { font-size: 16px !important; padding-top: 14px !important; }
      .footer-cell  { padding-top: 16px !important; font-size: 11px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#f0f4f8;">

  <!--[if mso]>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
  <tr>Your order will be delivered as soon as possible<td align="center">
  <![endif]-->

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
    class="email-wrapper" style="padding:32px 16px;">
    <tr>
      <td align="center">

        <!-- Card -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
          class="email-card"
          style="max-width:600px;background:#ffffff;padding:32px 28px;
                 border-radius:16px;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

          <!-- Logo / Brand -->
          <tr>
            <td align="center" style="padding-bottom:24px;">
              <span style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;
                           font-size:26px;font-weight:800;letter-spacing:-0.5px;color:#1a1a2e;">
                Shop<span style="color:#00c2a8;">ora</span>
              </span>
            </td>
          </tr>

          <!-- Header Banner -->
          <tr>
            <td class="header-cell"
              style="background:linear-gradient(135deg,#00c2a8 0%,#00a896 100%);
                     color:#ffffff;padding:22px 24px;border-radius:10px;text-align:center;">
              <p style="margin:0 0 6px 0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;
                        font-size:13px;font-weight:600;letter-spacing:2px;
                        text-transform:uppercase;opacity:0.85;">Order Confirmed</p>
              <h2 class="header-title"
                style="margin:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;
                       font-size:24px;font-weight:800;">Your order is on its way! 🎉</h2>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td class="greeting-cell"
              style="padding:24px 0 16px;
                     font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
              <p style="margin:0 0 8px;font-size:16px;font-weight:600;color:#1a1a2e;">
                Hello ${userName},
              </p>
              <p style="margin:0 0 8px;font-size:16px;font-weight:600;color:#00aeff;">
                Your order will be delivered as soon as possible
              </p>
              <p style="margin:0;font-size:14px;color:#666;line-height:1.6;">
                Thank you for shopping with us! Here's a summary of your order.
              </p>
            </td>
          </tr>

          <!-- Order Meta -->
          <tr>
            <td style="padding-bottom:16px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                style="background:#f8fafb;border-radius:8px;padding:14px 16px;">
                <tr>
                  <td style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;
                             font-size:13px;color:#888;">Total Items</td>
                  <td align="right"
                    style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;
                           font-size:13px;font-weight:700;color:#1a1a2e;">${products.length}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding-bottom:8px;">
              <p style="margin:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;
                        font-size:12px;font-weight:700;letter-spacing:1.5px;
                        text-transform:uppercase;color:#aaa;">Order Items</p>
            </td>
          </tr>

          <!-- Products -->
          <tr>
            <td>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${customerProducts}
              </table>
            </td>
          </tr>

          <!-- Total -->
          <tr class="total-row">
            <td align="right"
              style="padding-top:20px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;
                     font-size:18px;font-weight:800;color:#1a1a2e;
                     border-top:2px solid #f0f0f0;">
              Total&nbsp;&nbsp;
              <span style="color:#00c2a8;">$${total.toFixed(2)}</span>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td align="center" style="padding:28px 0 8px;">
              <a href="${clientUrl}/trackorder/${orderId}"
                style="display:inline-block;background:linear-gradient(135deg,#00c2a8,#00a896);
                       color:#fff;text-decoration:none;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;
                       font-size:14px;font-weight:700;padding:14px 32px;border-radius:50px;
                       letter-spacing:0.5px;">
                Track My Order →
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="footer-cell"
              align="center"
              style="padding-top:24px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;
                     font-size:12px;color:#bbb;border-top:1px solid #f0f0f0;">
              © ${new Date().getFullYear()} Shopora. All rights reserved.<br />
              <span style="font-size:11px;">You're receiving this because you placed an order.</span>
            </td>
          </tr>

        </table>
        <!-- /Card -->

      </td>
    </tr>
  </table>

  <!--[if mso]></td></tr></table><![endif]-->

</body>
</html>
    `;

    // ==============================
    // 3️⃣ Admin Template
    // ==============================
    const adminProducts = products.map(p => `
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #2a2a3e;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="80" style="vertical-align:middle;">
                <img src="${p.image}" alt="${p.name}" width="70" height="70"
                  style="display:block;width:70px;height:70px;object-fit:cover;
                         border-radius:8px;border:1px solid #333;" />
              </td>
              <td style="padding-left:12px;vertical-align:middle;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
                <p style="margin:0 0 4px 0;font-size:15px;font-weight:600;color:#f0f0f0;">${p.name}</p>
                <p style="margin:0;font-size:13px;color:#888;">SKU / Qty: ${p.quantity}</p>
              </td>
              <td align="right" style="vertical-align:middle;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
                <span style="font-size:15px;font-weight:700;color:#00c2a8;">$${Number(p.price).toFixed(2)}</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    `).join("");

    const adminHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>New Order – Shopora Admin</title>
  <style>
    @media only screen and (max-width: 600px) {
      .email-wrapper  { padding: 12px !important; }
      .email-card     { padding: 20px 16px !important; border-radius: 8px !important; }
      .header-cell    { padding: 18px 16px !important; border-radius: 6px !important; }
      .header-title   { font-size: 20px !important; }
      .meta-table td  { font-size: 13px !important; padding: 8px 12px !important; }
      .product-img    { width: 56px !important; height: 56px !important; }
      .total-row td   { font-size: 18px !important; padding-top: 14px !important; }
      .footer-cell    { padding-top: 16px !important; font-size: 11px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#0d0d1a;">

  <!--[if mso]>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
  <tr><td align="center">
  <![endif]-->

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
    class="email-wrapper" style="padding:32px 16px;">
    <tr>
      <td align="center">

        <!-- Card -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
          class="email-card"
          style="max-width:600px;background:#1a1a2e;padding:32px 28px;
                 border-radius:16px;border:1px solid #2a2a4a;">

          <!-- Logo / Brand -->
          <tr>
            <td align="center" style="padding-bottom:24px;">
              <span style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;
                           font-size:22px;font-weight:800;letter-spacing:-0.5px;color:#f0f0f0;">
                Shop<span style="color:#00c2a8;">ora</span>
                <span style="font-size:12px;font-weight:500;color:#666;
                             letter-spacing:2px;text-transform:uppercase;margin-left:6px;">Admin</span>
              </span>
            </td>
          </tr>

          <!-- Header Banner -->
          <tr>
            <td class="header-cell"
              style="background:linear-gradient(135deg,#1f1f3a 0%,#2a2a50 100%);
                     border:1px solid #3a3a60;
                     color:#ffffff;padding:22px 24px;border-radius:10px;text-align:center;">
              <p style="margin:0 0 6px 0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;
                        font-size:12px;font-weight:700;letter-spacing:2.5px;
                        text-transform:uppercase;color:#00c2a8;">New Order Received</p>
              <h2 class="header-title"
                style="margin:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;
                       font-size:22px;font-weight:800;color:#f0f0f0;">
                Action Required 📦
              </h2>
            </td>
          </tr>

          <!-- Customer Info -->
          <tr>
            <td style="padding:20px 0 16px;">
              <p style="margin:0 0 12px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;
                        font-size:12px;font-weight:700;letter-spacing:1.5px;
                        text-transform:uppercase;color:#555;">Customer Details</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                class="meta-table"
                style="background:#12122a;border-radius:10px;overflow:hidden;
                       border:1px solid #2a2a4a;">
                <tr>
                  <td style="padding:12px 16px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;
                             font-size:14px;color:#888;width:40%;border-bottom:1px solid #1e1e38;">
                    👤 Name
                  </td>
                  <td style="padding:12px 16px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;
                             font-size:14px;font-weight:600;color:#f0f0f0;border-bottom:1px solid #1e1e38;">
                    ${userName}
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 16px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;
                             font-size:14px;color:#888;width:40%;border-bottom:1px solid #1e1e38;">
                    ✉️ Email
                  </td>
                  <td style="padding:12px 16px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;
                             font-size:14px;font-weight:600;color:#00c2a8;border-bottom:1px solid #1e1e38;">
                    ${email}
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 16px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;
                             font-size:14px;color:#888;">
                    📦 Items
                  </td>
                  <td style="padding:12px 16px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;
                             font-size:14px;font-weight:600;color:#f0f0f0;">
                    ${products.length}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Products Header -->
          <tr>
            <td style="padding-bottom:8px;">
              <p style="margin:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;
                        font-size:12px;font-weight:700;letter-spacing:1.5px;
                        text-transform:uppercase;color:#555;">Order Items</p>
            </td>
          </tr>

          <!-- Products -->
          <tr>
            <td>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${adminProducts}
              </table>
            </td>
          </tr>

          <!-- Total -->
          <tr class="total-row">
            <td style="padding-top:20px;border-top:1px solid #2a2a4a;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                style="background:linear-gradient(135deg,#00c2a8,#00a896);
                       border-radius:10px;padding:16px 20px;">
                <tr>
                  <td style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;
                             font-size:14px;font-weight:600;color:rgba(255,255,255,0.8);">
                    Order Total
                  </td>
                  <td align="right"
                    style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;
                           font-size:22px;font-weight:800;color:#fff;">
                    $${total.toFixed(2)}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="footer-cell"
              align="center"
              style="padding-top:28px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;
                     font-size:12px;color:#444;border-top:1px solid #2a2a4a;">
              © ${new Date().getFullYear()} Shopora Admin Panel · Internal Use Only
            </td>
          </tr>

        </table>
        <!-- /Card -->

      </td>
    </tr>
  </table>

  <!--[if mso]></td></tr></table><![endif]-->

</body>
</html>
    `;

    // ==============================
    // 4️⃣ Send Customer Email
    // ==============================
    await transporter.sendMail({
     from: `Shopora <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Order Confirmation 🛒",
      html: customerHTML
    });

    // ==============================
    // 5️⃣ Send Admin Email
    // ==============================
    await transporter.sendMail({
      from: `Shopora <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `New Order from ${userName}`,
      html: adminHTML
    });

    console.log("✅ Customer & Admin emails sent successfully");

  } catch (error) {
    console.error("❌ Email sending failed:", error);
  }
}

async function sendSubscritionEmail(userName, email) {
  await transporter.sendMail({
    from: `Shopora <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Subscription Activated 🎉",
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>Welcome to Shopora</title>
  <style>
    @media only screen and (max-width: 600px) {
      .email-wrapper { padding: 12px !important; }
      .email-card    { padding: 24px 16px !important; border-radius: 8px !important; }
      .header-cell   { padding: 28px 20px !important; border-radius: 8px !important; }
      .header-emoji  { font-size: 40px !important; }
      .header-title  { font-size: 22px !important; }
      .body-cell     { padding: 20px 0 !important; font-size: 14px !important; }
      .badge-table td{ padding: 10px 14px !important; font-size: 13px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#f0f4f8;">

  <!--[if mso]>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
  <tr><td align="center">
  <![endif]-->

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
    class="email-wrapper" style="padding:32px 16px;">
    <tr>
      <td align="center">

        <!-- Card -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
          class="email-card"
          style="max-width:600px;background:#ffffff;padding:36px 28px;
                 border-radius:16px;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom:28px;">
              <span style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;
                           font-size:26px;font-weight:800;letter-spacing:-0.5px;color:#1a1a2e;">
                Shop<span style="color:#00c2a8;">ora</span>
              </span>
            </td>
          </tr>

          <!-- Hero Banner -->
          <tr>
            <td class="header-cell"
              style="background:linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%);
                     padding:36px 24px;border-radius:12px;text-align:center;">
              <p class="header-emoji" style="margin:0 0 12px;font-size:48px;line-height:1;">🎉</p>
              <h2 class="header-title"
                style="margin:0 0 8px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;
                       font-size:26px;font-weight:800;color:#ffffff;">
                Welcome to Shopora!
              </h2>
              <p style="margin:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;
                        font-size:14px;color:rgba(255,255,255,0.65);">
                Your subscription is now active
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td class="body-cell"
              style="padding:28px 0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;
                     font-size:15px;color:#444;line-height:1.7;">
              <p style="margin:0 0 12px;">Hi <strong style="color:#1a1a2e;">${userName}</strong>,</p>
              <p style="margin:0 0 12px;">
                Your subscription has been activated successfully. You now have full access
                to all premium features and exclusive deals.
              </p>
              <p style="margin:0;">We're thrilled to have you on board. Happy shopping! 🛍️</p>
            </td>
          </tr>

          <!-- Benefits -->
          <tr>
            <td style="padding-bottom:28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                class="badge-table"
                style="background:#f8fafb;border-radius:10px;overflow:hidden;">
                <tr>
                  <td style="padding:12px 16px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;
                             font-size:14px;color:#444;border-bottom:1px solid #eee;">
                    ✅ &nbsp;Free shipping on all orders
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 16px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;
                             font-size:14px;color:#444;border-bottom:1px solid #eee;">
                    ✅ &nbsp;Exclusive member discounts
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 16px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;
                             font-size:14px;color:#444;">
                    ✅ &nbsp;Early access to new arrivals
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td align="center" style="padding-bottom:8px;">
              <a href="${clientUrl}/shope"
                style="display:inline-block;background:linear-gradient(135deg,#00c2a8,#00a896);
                       color:#fff;text-decoration:none;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;
                       font-size:14px;font-weight:700;padding:14px 36px;border-radius:50px;
                       letter-spacing:0.5px;">
                Start Shopping →
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center"
              style="padding-top:28px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;
                     font-size:12px;color:#bbb;border-top:1px solid #f0f0f0;">
              © ${new Date().getFullYear()} Shopora. All rights reserved.<br />
              <span style="font-size:11px;">You're receiving this because you subscribed at Shopora.</span>
            </td>
          </tr>

        </table>
        <!-- /Card -->

      </td>
    </tr>
  </table>

  <!--[if mso]></td></tr></table><![endif]-->

</body>
</html>`
  });
}

function sendProductCreateEmail(user) {
  const html = `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <title>New Product Drop — ${user.product.name}</title>
  <!--[if mso]>
  <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
  <![endif]-->
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body,table,td,a { -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
    table,td { mso-table-lspace:0pt; mso-table-rspace:0pt; }
    img { -ms-interpolation-mode:bicubic; border:0; height:auto; line-height:100%; outline:none; text-decoration:none; display:block; }

    body {
      background-color: #f5f3ee;
      font-family: Georgia, 'Times New Roman', serif;
      margin: 0; padding: 0; width: 100%;
    }
    .email-wrapper { background-color:#f5f3ee; padding:48px 16px; }
    .email-container { max-width:600px; margin:0 auto; background:#fff; border-radius:2px; overflow:hidden; box-shadow:0 2px 40px rgba(0,0,0,0.08); }
    .top-stripe { background:#1a1a1a; height:4px; width:100%; }

    /* Header */
    .header { padding:48px 48px 36px; border-bottom:1px solid #eeebe4; }
    .badge { display:inline-block; background:#f0ebe0; color:#9a7c4f; font-size:9px; letter-spacing:4px; text-transform:uppercase; padding:6px 14px; border-radius:100px; font-family:'Courier New',Courier,monospace; margin-bottom:24px; }
    .header-eyebrow { font-size:11px; letter-spacing:4px; text-transform:uppercase; color:#b0a898; font-family:'Courier New',Courier,monospace; margin-bottom:12px; }
    .header-title { font-size:42px; font-weight:400; color:#1a1a1a; line-height:1.05; letter-spacing:-1.5px; margin-bottom:16px; }
    .header-title em { font-style:italic; color:#9a7c4f; }
    .header-desc { font-size:15px; color:#7a7060; line-height:1.7; max-width:420px; }

    /* Image */
    .image-section { background:#f9f7f2; padding:48px; text-align:center; border-bottom:1px solid #eeebe4; }

    /* Details */
    .details-section { padding:40px 48px; border-bottom:1px solid #eeebe4; }
    .product-name-large { font-size:52px; font-weight:400; color:#1a1a1a; letter-spacing:-2px; line-height:1; margin-bottom:6px; }
    .product-tagline { font-size:11px; color:#b0a898; font-family:'Courier New',Courier,monospace; letter-spacing:3px; text-transform:uppercase; margin-bottom:28px; }
    .product-description { font-size:15px; color:#5a5248; line-height:1.8; margin-bottom:28px; border-left:2px solid #e0dbd0; padding-left:20px; }
    .meta-row { background:#f9f7f2; border:1px solid #eeebe4; border-radius:2px; padding:16px 20px; }
    .meta-label { font-size:9px; color:#b0a898; letter-spacing:3px; text-transform:uppercase; font-family:'Courier New',Courier,monospace; margin-bottom:3px; }
    .meta-value { font-size:12px; color:#9a7c4f; font-family:'Courier New',Courier,monospace; letter-spacing:1px; word-break:break-all; }

    /* CTA */
    .cta-section { padding:40px 48px; text-align:center; border-bottom:1px solid #eeebe4; }
    .cta-text { font-size:14px; color:#9a9088; margin-bottom:24px; font-style:italic; }
    .cta-button { display:inline-block; background:#1a1a1a; color:#ffffff !important; font-family:'Courier New',Courier,monospace; font-size:10px; font-weight:700; letter-spacing:4px; text-transform:uppercase; text-decoration:none; padding:18px 48px; border-radius:2px; }
    .cta-secondary { display:inline-block; color:#9a7c4f !important; font-family:'Courier New',Courier,monospace; font-size:10px; letter-spacing:3px; text-transform:uppercase; text-decoration:underline; text-underline-offset:3px; margin-top:14px; }

    /* Subscriber note */
    .subscriber-note { padding:28px 48px; border-bottom:1px solid #eeebe4; }
    .note-text { font-size:13px; color:#7a7060; line-height:1.7; }
    .note-text strong { color:#1a1a1a; font-style:italic; }

    /* Footer */
    .footer { padding:32px 48px; background:#f9f7f2; }
    .footer-brand { font-size:16px; color:#1a1a1a; letter-spacing:-0.5px; margin-bottom:16px; }
    .footer-text { font-size:11px; color:#b0a898; line-height:1.7; font-family:'Courier New',Courier,monospace; }
    .footer-text a { color:#9a7c4f; text-decoration:none; }

    /* Responsive */
    @media only screen and (max-width:600px) {
      .email-wrapper { padding:20px 8px; }
      .header { padding:32px 24px 28px; }
      .header-title { font-size:28px; letter-spacing:-1px; }
      .image-section { padding:32px 20px; }
      .details-section { padding:32px 24px; }
      .product-name-large { font-size:36px; letter-spacing:-1px; }
      .cta-section { padding:32px 24px; }
      .subscriber-note { padding:20px 24px; }
      .footer { padding:28px 24px; }
      .cta-button { display:block !important; padding:18px 20px !important; }
    }
    @media only screen and (max-width:400px) {
      .header-title { font-size:22px; }
      .product-name-large { font-size:28px; }
    }
  </style>
</head>
<body>
<div class="email-wrapper">
  <div class="email-container">

    <!-- Accent stripe -->
    <div class="top-stripe"></div>

    <!-- HEADER -->
    <div class="header">
      <div class="badge">✦ Just Added</div>
      <div class="header-eyebrow">New Product</div>
      <h1 class="header-title">Something <em>new</em><br>just arrived.</h1>
      <p class="header-desc">As a subscriber, you're among the very first to know. We just added a brand-new product to our store — and we think you'll love it.</p>
    </div>

    <!-- PRODUCT IMAGE -->
    <div class="image-section">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center">
            <img
              src="${user.product.image}"
              alt="PC"
              width="320"
              style="max-width:320px; width:100%; height:auto; border-radius:4px; display:inline-block;"
            />
          </td>
        </tr>
      </table>
    </div>

    <!-- PRODUCT DETAILS -->
    <div class="details-section">
      <div class="product-name-large">${user.product.name}</div>
      <div class="product-tagline">Available Now in Store</div>
      <p class="product-description">
        Introducing our newest addition — the <strong>${user.product.name}</strong>. Crafted for performance, designed to impress. Whether you're working, creating, or gaming, this machine is built to keep up with everything you do.
      </p>

    <!-- CTA -->
    <div class="cta-section">
      <p class="cta-text">Be the first to get your hands on it.</p>
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center">
            <a href="${link}/${user.product._id}" class="cta-button">View Product</a>
          </td>
        </tr>
        <tr>
          <td align="center">
            <a href="${clientUrl}/shope" class="cta-secondary">Browse All Products →</a>
          </td>
        </tr>
      </table>
    </div>

    <!-- SUBSCRIBER NOTE -->
    <div class="subscriber-note">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="background:#f9f7f2; border-radius:2px; padding:20px 24px;">
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td valign="top" style="font-size:18px; padding-right:14px; padding-top:2px; white-space:nowrap;">🔔</td>
                <td class="note-text">
                  You're receiving this email because you subscribed to our product updates.
                  <strong><em>Subscribers always hear about new arrivals first</em></strong> — thanks for being part of our community.
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>

    <!-- FOOTER -->
    <div class="footer">
      <div class="footer-brand">Shopora</div>
      <hr style="border:none; border-top:1px solid #e0dbd0; margin-bottom:16px;" />
      <div class="footer-text">
        You received this because you subscribed to product updates.<br>
        <a href="#">Unsubscribe</a> &nbsp;·&nbsp; <a href="${link}/${user.product._id}">View in browser</a> &nbsp;·&nbsp; <a href="${clientUrl}/policy">Privacy Policy</a>
      </div>
    </div>

  </div>
</div>
</body>
</html>
`
  for (let email of user.emails) {
    send(email, html);
  }

  async function send(to, html) {
    await transporter.sendMail({ from: `Shopora <${process.env.EMAIL_USER}>`, to, html })
  }
}

async function approvedOrder(user) {
  await transporter.sendMail({
   from: `Shopora <${process.env.EMAIL_USER}>`,
    to: user.email,
    subject: `✅ Your Order Has Been Approved – Shopora`,
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>Order Approved – Shopora</title>
</head>
<body style="
  margin: 0;
  padding: 0;
  background-color: #f0f4f8;
  font-family: 'Georgia', 'Times New Roman', serif;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
">

  <!-- Outer wrapper -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
    style="background-color: #f0f4f8; padding: 40px 16px;">
    <tr>
      <td align="center">

        <!-- Email card -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
          style="max-width: 600px; background-color: #ffffff; border-radius: 16px;
                 overflow: hidden; box-shadow: 0 8px 40px rgba(0,0,0,0.10);">

          <!-- Header Banner -->
          <tr>
            <td style="
              background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
              padding: 40px 32px 32px;
              text-align: center;
            ">
              <!-- Logo -->
              <div style="margin-bottom: 16px;">
                <span style="
                  font-size: 28px;
                  font-weight: 700;
                  color: #ffffff;
                  letter-spacing: 4px;
                  text-transform: uppercase;
                  font-family: 'Georgia', serif;
                ">SHOP<span style="color: #e94560;">ORA</span></span>
              </div>

              <!-- Status badge -->
              <div style="
                display: inline-block;
                background-color: #e94560;
                color: #ffffff;
                font-size: 11px;
                font-weight: 700;
                letter-spacing: 3px;
                text-transform: uppercase;
                padding: 6px 20px;
                border-radius: 50px;
                font-family: Arial, sans-serif;
                margin-bottom: 20px;
              ">ORDER CONFIRMED</div>

              <!-- Big checkmark -->
              <div style="
                width: 72px;
                height: 72px;
                background-color: rgba(233, 69, 96, 0.15);
                border: 2px solid #e94560;
                border-radius: 50%;
                margin: 0 auto 12px;
                line-height: 72px;
                font-size: 32px;
              ">✓</div>
            </td>
          </tr>

          <!-- Greeting Section -->
          <tr>
            <td style="padding: 36px 40px 0;">
              <p style="
                margin: 0 0 8px;
                font-size: 13px;
                color: #9ca3af;
                text-transform: uppercase;
                letter-spacing: 2px;
                font-family: Arial, sans-serif;
              ">Hello,</p>
              <h1 style="
                margin: 0 0 16px;
                font-size: 26px;
                color: #1a1a2e;
                font-weight: 700;
                line-height: 1.3;
                font-family: 'Georgia', serif;
              ">${user.name}</h1>
              <p style="
                margin: 0;
                font-size: 16px;
                color: #4b5563;
                line-height: 1.7;
                font-family: Arial, sans-serif;
              ">
                Great news! Your order has been <strong style="color: #e94560;">approved</strong>
                and is now being prepared. We'll get it on its way to you shortly.
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding: 28px 40px 0;">
              <div style="border-top: 1px solid #e5e7eb;"></div>
            </td>
          </tr>

          <!-- Delivery Address Section -->
          <tr>
            <td style="padding: 28px 40px 0;">
              <p style="
                margin: 0 0 16px;
                font-size: 11px;
                color: #9ca3af;
                text-transform: uppercase;
                letter-spacing: 2px;
                font-family: Arial, sans-serif;
              ">📦 Delivery Address</p>

              <!-- Address Card -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
                style="
                  background-color: #f8fafc;
                  border: 1px solid #e2e8f0;
                  border-left: 4px solid #e94560;
                  border-radius: 10px;
                  overflow: hidden;
                ">
                <tr>
                  <td style="padding: 24px 28px;">

                    <!-- Street -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
                      style="margin-bottom: 14px;">
                      <tr>
                        <td width="90" style="
                          font-size: 11px;
                          color: #9ca3af;
                          text-transform: uppercase;
                          letter-spacing: 1px;
                          font-family: Arial, sans-serif;
                          padding-top: 2px;
                          vertical-align: top;
                        ">Street</td>
                        <td style="
                          font-size: 15px;
                          color: #1a1a2e;
                          font-family: Arial, sans-serif;
                          font-weight: 600;
                        ">${user.address.street}</td>
                      </tr>
                    </table>

                    <!-- City -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
                      style="margin-bottom: 14px;">
                      <tr>
                        <td width="90" style="
                          font-size: 11px;
                          color: #9ca3af;
                          text-transform: uppercase;
                          letter-spacing: 1px;
                          font-family: Arial, sans-serif;
                          padding-top: 2px;
                          vertical-align: top;
                        ">City</td>
                        <td style="
                          font-size: 15px;
                          color: #1a1a2e;
                          font-family: Arial, sans-serif;
                          font-weight: 600;
                        ">${user.address.city}</td>
                      </tr>
                    </table>

                    <!-- Home -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
                      style="margin-bottom: 14px;">
                      <tr>
                        <td width="90" style="
                          font-size: 11px;
                          color: #9ca3af;
                          text-transform: uppercase;
                          letter-spacing: 1px;
                          font-family: Arial, sans-serif;
                          padding-top: 2px;
                          vertical-align: top;
                        ">Home</td>
                        <td style="
                          font-size: 15px;
                          color: #1a1a2e;
                          font-family: Arial, sans-serif;
                          font-weight: 600;
                        ">${user.address.home}</td>
                      </tr>
                    </table>

                    <!-- House -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="90" style="
                          font-size: 11px;
                          color: #9ca3af;
                          text-transform: uppercase;
                          letter-spacing: 1px;
                          font-family: Arial, sans-serif;
                          padding-top: 2px;
                          vertical-align: top;
                        ">House</td>
                        <td style="
                          font-size: 15px;
                          color: #1a1a2e;
                          font-family: Arial, sans-serif;
                          font-weight: 600;
                        ">${user.address.house}</td>
                      </tr>
                    </table>

                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td style="padding: 32px 40px 0; text-align: center;">
              <a href="${clientUrl}/trackorder/${user.orderId}" style="
                display: inline-block;
                background: linear-gradient(135deg, #e94560, #c73652);
                color: #ffffff;
                text-decoration: none;
                font-size: 14px;
                font-weight: 700;
                letter-spacing: 2px;
                text-transform: uppercase;
                padding: 14px 36px;
                border-radius: 50px;
                font-family: Arial, sans-serif;
                box-shadow: 0 4px 20px rgba(233, 69, 96, 0.35);
              ">Track Your Order →</a>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding: 32px 40px 0;">
              <div style="border-top: 1px solid #e5e7eb;"></div>
            </td>
          </tr>

          <!-- Thank You Note -->
          <tr>
            <td style="padding: 24px 40px 0; text-align: center;">
              <p style="
                margin: 0;
                font-size: 15px;
                color: #6b7280;
                line-height: 1.7;
                font-family: Arial, sans-serif;
              ">
                Thank you for shopping with us. We truly appreciate your trust in
                <strong style="color: #1a1a2e;">Shopora</strong>. 🛍️
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="
              background-color: #1a1a2e;
              padding: 28px 32px;
              text-align: center;
              margin-top: 32px;
            ">
              <!-- Footer top spacing hack for email clients -->
              <div style="height: 1px; margin-bottom: 24px;"></div>

              <p style="
                margin: 0 0 8px;
                font-size: 18px;
                color: #ffffff;
                letter-spacing: 3px;
                font-family: 'Georgia', serif;
              ">SHOP<span style="color: #e94560;">ORA</span></p>

              <p style="
                margin: 0 0 16px;
                font-size: 12px;
                color: #6b7280;
                font-family: Arial, sans-serif;
                line-height: 1.6;
              ">
                You're receiving this email because you placed an order on Shopora.<br/>
                © ${new Date().getFullYear()} Shopora. All rights reserved.
              </p>

              <p style="margin: 0;">
                <a href="#" style="
                  color: #9ca3af;
                  text-decoration: none;
                  font-size: 11px;
                  font-family: Arial, sans-serif;
                  margin: 0 10px;
                ">Privacy Policy</a>
                <span style="color: #374151;">|</span>
                <a href="#" style="
                  color: #9ca3af;
                  text-decoration: none;
                  font-size: 11px;
                  font-family: Arial, sans-serif;
                  margin: 0 10px;
                ">Contact Support</a>
                <span style="color: #374151;">|</span>
                <a href="#" style="
                  color: #9ca3af;
                  text-decoration: none;
                  font-size: 11px;
                  font-family: Arial, sans-serif;
                  margin: 0 10px;
                ">Unsubscribe</a>
              </p>
            </td>
          </tr>

        </table>
        <!-- End email card -->

      </td>
    </tr>
  </table>

</body>
</html>`
  });
};

async function rejectedOrder(user) {
  await transporter.sendMail({
    from: `Shopora <${process.env.EMAIL_USER}>`,
    to: user.email,
    subject: `❌ Your Order Has Been Cancelled – Shopora`,
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>Order Cancelled – Shopora</title>
</head>
<body style="
  margin: 0;
  padding: 0;
  background-color: #f0f4f8;
  font-family: 'Georgia', 'Times New Roman', serif;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
">

  <!-- Outer wrapper -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
    style="background-color: #f0f4f8; padding: 40px 16px;">
    <tr>
      <td align="center">

        <!-- Email card -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
          style="max-width: 600px; background-color: #ffffff; border-radius: 16px;
                 overflow: hidden; box-shadow: 0 8px 40px rgba(0,0,0,0.10);">

          <!-- Header Banner -->
          <tr>
            <td style="
              background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
              padding: 40px 32px 32px;
              text-align: center;
            ">
              <!-- Logo -->
              <div style="margin-bottom: 16px;">
                <span style="
                  font-size: 28px;
                  font-weight: 700;
                  color: #ffffff;
                  letter-spacing: 4px;
                  text-transform: uppercase;
                  font-family: 'Georgia', serif;
                ">SHOP<span style="color: #e94560;">ORA</span></span>
              </div>

              <!-- Status badge -->
              <div style="
                display: inline-block;
                background-color: #dc2626;
                color: #ffffff;
                font-size: 11px;
                font-weight: 700;
                letter-spacing: 3px;
                text-transform: uppercase;
                padding: 6px 20px;
                border-radius: 50px;
                font-family: Arial, sans-serif;
                margin-bottom: 20px;
              ">ORDER CANCELLED</div>

              <!-- Big X icon -->
              <div style="
                width: 72px;
                height: 72px;
                background-color: rgba(220, 38, 38, 0.15);
                border: 2px solid #dc2626;
                border-radius: 50%;
                margin: 0 auto 12px;
                line-height: 72px;
                font-size: 32px;
                color: #dc2626;
              ">✕</div>
            </td>
          </tr>

          <!-- Greeting Section -->
          <tr>
            <td style="padding: 36px 40px 0;">
              <p style="
                margin: 0 0 8px;
                font-size: 13px;
                color: #9ca3af;
                text-transform: uppercase;
                letter-spacing: 2px;
                font-family: Arial, sans-serif;
              ">Hello,</p>
              <h1 style="
                margin: 0 0 16px;
                font-size: 26px;
                color: #1a1a2e;
                font-weight: 700;
                line-height: 1.3;
                font-family: 'Georgia', serif;
              ">${user.name}</h1>
              <p style="
                margin: 0;
                font-size: 16px;
                color: #4b5563;
                line-height: 1.7;
                font-family: Arial, sans-serif;
              ">
                We're sorry to inform you that your order has been
                <strong style="color: #dc2626;">cancelled</strong>.
                If you believe this is a mistake or need further assistance,
                please don't hesitate to contact our support team.
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding: 28px 40px 0;">
              <div style="border-top: 1px solid #e5e7eb;"></div>
            </td>
          </tr>

          <!-- Reason Section -->
          <tr>
            <td style="padding: 28px 40px 0;">
              <p style="
                margin: 0 0 16px;
                font-size: 11px;
                color: #9ca3af;
                text-transform: uppercase;
                letter-spacing: 2px;
                font-family: Arial, sans-serif;
              ">⚠️ Cancellation Reason</p>

              <!-- Reason Card -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
                style="
                  background-color: #fef2f2;
                  border: 1px solid #fecaca;
                  border-left: 4px solid #dc2626;
                  border-radius: 10px;
                  overflow: hidden;
                ">
                <tr>
                  <td style="padding: 24px 28px;">
                    <p style="
                      margin: 0;
                      font-size: 15px;
                      color: #1a1a2e;
                      font-family: Arial, sans-serif;
                      font-weight: 600;
                      line-height: 1.6;
                    ">${user.reason || 'Your order did not meet our processing requirements. Please review your order details and try again.'}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Order Info Section -->
          <tr>
            <td style="padding: 28px 40px 0;">
              <p style="
                margin: 0 0 16px;
                font-size: 11px;
                color: #9ca3af;
                text-transform: uppercase;
                letter-spacing: 2px;
                font-family: Arial, sans-serif;
              ">📋 Order Details</p>

              <!-- Order Card -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
                style="
                  background-color: #f8fafc;
                  border: 1px solid #e2e8f0;
                  border-left: 4px solid #64748b;
                  border-radius: 10px;
                  overflow: hidden;
                ">
                <tr>
                  <td style="padding: 24px 28px;">
                  
                    <!-- Customer Name -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="120" style="
                          font-size: 11px;
                          color: #9ca3af;
                          text-transform: uppercase;
                          letter-spacing: 1px;
                          font-family: Arial, sans-serif;
                          padding-top: 2px;
                          vertical-align: top;
                        ">Customer</td>
                        <td style="
                          font-size: 15px;
                          color: #1a1a2e;
                          font-family: Arial, sans-serif;
                          font-weight: 600;
                        ">${user.name}</td>
                      </tr>
                    </table>

                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td style="padding: 32px 40px 0; text-align: center;">
              <a href="${clientUrl}/contact" style="
                display: inline-block;
                background: linear-gradient(135deg, #dc2626, #b91c1c);
                color: #ffffff;
                text-decoration: none;
                font-size: 14px;
                font-weight: 700;
                letter-spacing: 2px;
                text-transform: uppercase;
                padding: 14px 36px;
                border-radius: 50px;
                font-family: Arial, sans-serif;
                box-shadow: 0 4px 20px rgba(220, 38, 38, 0.35);
              ">Contact Support →</a>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding: 32px 40px 0;">
              <div style="border-top: 1px solid #e5e7eb;"></div>
            </td>
          </tr>

          <!-- Reassurance Note -->
          <tr>
            <td style="padding: 24px 40px 0; text-align: center;">
              <p style="
                margin: 0;
                font-size: 15px;
                color: #6b7280;
                line-height: 1.7;
                font-family: Arial, sans-serif;
              ">
                We apologize for any inconvenience caused. You're always welcome to
                place a new order at <strong style="color: #1a1a2e;">Shopora</strong>. 🛍️
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="
              background-color: #1a1a2e;
              padding: 28px 32px;
              text-align: center;
              margin-top: 32px;
            ">
              <div style="height: 1px; margin-bottom: 24px;"></div>

              <p style="
                margin: 0 0 8px;
                font-size: 18px;
                color: #ffffff;
                letter-spacing: 3px;
                font-family: 'Georgia', serif;
              ">SHOP<span style="color: #e94560;">ORA</span></p>

              <p style="
                margin: 0 0 16px;
                font-size: 12px;
                color: #6b7280;
                font-family: Arial, sans-serif;
                line-height: 1.6;
              ">
                You're receiving this email because you placed an order on Shopora.<br/>
                © ${new Date().getFullYear()} Shopora. All rights reserved.
              </p>

              <p style="margin: 0;">
                <a href="#" style="
                  color: #9ca3af;
                  text-decoration: none;
                  font-size: 11px;
                  font-family: Arial, sans-serif;
                  margin: 0 10px;
                ">Privacy Policy</a>
                <span style="color: #374151;">|</span>
                <a href="#" style="
                  color: #9ca3af;
                  text-decoration: none;
                  font-size: 11px;
                  font-family: Arial, sans-serif;
                  margin: 0 10px;
                ">Contact Support</a>
                <span style="color: #374151;">|</span>
                <a href="#" style="
                  color: #9ca3af;
                  text-decoration: none;
                  font-size: 11px;
                  font-family: Arial, sans-serif;
                  margin: 0 10px;
                ">Unsubscribe</a>
              </p>
            </td>
          </tr>

        </table>
        <!-- End email card -->

      </td>
    </tr>
  </table>

</body>
</html>`
  });
};

module.exports = { sendOrderEmail, sendSubscritionEmail, sendProductCreateEmail, approvedOrder, rejectedOrder };

