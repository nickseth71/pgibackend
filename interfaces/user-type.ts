import { Document } from "mongoose"

export interface UserModel extends Document {
  id: string
  name: string
  email: string
  password: string
  role: string
  createdAt: Date
  otp: string
  otpExpire: Date
  matchPassword(password: string): Promise<boolean>
  getResetPasswordToken(): string
  generateOTP(): Promise<void>
  generateOTPByEmail(email: string): Promise<UserModel>
  sendOTPEmail(email: string, otp: string): Promise<void>
  verifyOTP(otp: string): Promise<boolean>
}
