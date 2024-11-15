// takes the email and code and sends it to the email in a customized html
import nodemailer from 'nodemailer';

export const sendVerificationEmail = async (email: string, code: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your 2FA Code",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff5e6; border-radius: 12px; border: 1px solid #ffcc99;">
        <div style="background-color: #ff6600; color: white; padding: 20px; text-align: center; border-radius: 12px 12px 0 0;">
          <h2 style="margin: 0;">Guhuza 2FA Verification</h2>
        </div>
        <div style="padding: 20px; color: #333;">
          <p>Your Guhuza verification code is:</p>
          <p style="font-size: 24px; font-weight: bold; color: #ff6600; text-align: center;">${code}</p>
          <p>Use this code to complete your verification. It will expire in 10 minutes.</p>
        </div>
        <div style="text-align: center; margin-top: 20px;">
          <a href="https://guhuza.com" style="padding: 10px 20px; background-color: #ff6600; color: white; text-decoration: none; border-radius: 6px;">Visit Guhuza</a>
        </div>
        <div style="background-color: #fff0e6; color: #666; padding: 15px; text-align: center; border-radius: 0 0 12px 12px; margin-top: 30px;">
          <p style="font-size: 12px;">&copy; 2024 Guhuza. All rights reserved.</p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
