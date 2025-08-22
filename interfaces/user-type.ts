import { Document } from "mongoose"

export interface UserModel extends Document {
  userId: string
  name: string
  email: string
  password: string
  role: string
  createdAt: String
  updatedAt: String
  otp: string
  otpExpire: Date
  matchPassword(password: string): Promise<boolean>
  getResetPasswordToken(): string
  generateOTP(): Promise<void>
  generateOTPByEmail(email: string): Promise<UserModel>
  sendOTPEmail(email: string, otp: string): Promise<void>
  verifyOTP(otp: string): Promise<boolean>
}
