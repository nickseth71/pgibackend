"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOTPEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    }
});
const sendOTPEmail = async (email, otp) => {
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
exports.sendOTPEmail = sendOTPEmail;
//# sourceMappingURL=email-service.js.map