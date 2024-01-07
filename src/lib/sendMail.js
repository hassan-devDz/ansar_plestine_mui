

import { createTransport } from "nodemailer";

function buildEmailMessage(message) {
  return `<div style="direction: rtl;text-align: right;">
      <p>${message}</p>
  </div>`;
}

export function sendMailer(body) {
  return new Promise((resolve, reject) => {
    const transporter = createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false, // إذا كنت تستخدم SSL/TLS للاتصال، غير هذا إلى true
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `${body.name} <${body.email}>`,
      to: process.env.EMAIL_USERNAME,
      subject: body.subject,
      html: buildEmailMessage(body.message),
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error("حدث خطأ في إرسال البريد الإلكتروني:", error);
        reject({
          success: false,
          error: error.message,
        });
      } else {
        console.log("تم إرسال البريد الإلكتروني بنجاح:", info.response);
        resolve({
          success: true,
        });
      }
    });
  });
}
