import User from "../models/user.js"
import ErrorResponse from "../utils/error-response.js"
import crypto from "crypto"

class AuthService {
  async registerUser(
    name: string,
    email: string,
    password: string,
    role: string
  ) {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      throw new ErrorResponse("User already exists", 400)
    }

    const user = await User.create({ name, email, password, role })
    return user
  }

  async loginUser(email: string, password: string) {
    const user = await User.findOne({ email }).select("+password")
    if (!user) {
      throw new ErrorResponse("Invalid credentials", 401)
    }

    const isMatch = await user.matchPassword(password)
    if (!isMatch) {
      throw new ErrorResponse("Invalid credentials", 401)
    }

    return user
  }

  async getCurrentUser(userId: string) {
    const user = await User.findById(userId)
    if (!user) {
      throw new ErrorResponse("User not found", 404)
    }
    return user
  }

  async updateUserDetails(userId: string, fieldsToUpdate: any) {
    const allowedFields = ["name"]
    const invalidFields = Object.keys(fieldsToUpdate).filter(
      (key) => !allowedFields.includes(key)
    )

    if (invalidFields.length > 0) {
      throw new Error("You can only update your name.")
    }

    const fields: { name?: string } = {}
    if (fieldsToUpdate.name) {
      fields.name = fieldsToUpdate.name
    }

    const user = await User.findByIdAndUpdate(userId, fields, {
      new: true,
      runValidators: true,
    })

    return user
  }

  async generateOTP(userId: string) {
    const user = await User.findById(userId)
    if (!user) throw new ErrorResponse("User not found", 404)
    user.generateOTP()
    await user.save()
    return user
  }

  async generateOTPByEmail(email: string) {
    const user = await User.findOne({ email })
    if (!user) throw new ErrorResponse("User not found", 404)
    return this.generateOTP(user._id)
  }

  async verifyOTPAndUpdatePassword(
    email: string,
    otp: string,
    password: string
  ) {
    const user = await User.findOne({
      email,
      otp,
      otpExpire: { $gt: Date.now() },
    })

    if (!user) throw new ErrorResponse("Invalid or expired OTP", 400)

    user.password = password
    user.otp = undefined
    user.otpExpire = undefined
    await user.save()

    return user
  }

  async verifyOTPAndUpdateEmail(email: string, otp: string, newEmail: string) {
    const user = await User.findOne({
      email: email,
      otp,
      otpExpire: { $gt: Date.now() },
    })

    if (!user) throw new ErrorResponse("Invalid or expired OTP", 400)

    user.email = newEmail
    user.otp = undefined
    user.otpExpire = undefined
    await user.save()

    return user
  }
}

export default new AuthService()
