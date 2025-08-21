import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    }
});
export const sendOTPEmail = async (email, otp) => {
    if (!email || !otp) {
        throw new Error('Email and OTP are required');
    }
    const mailOptions = {
        from: process.env.SMTP_USER,
        to: email,
        subject: 'Your OTP for account changes',
        text: `Your OTP is ${otp}. It will expire in 10 minutes.`
    };
    await transporter.sendMail(mailOptions);
};
//# sourceMappingURL=email-service.js.map