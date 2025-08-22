import mongoose, { Schema } from "mongoose"
import bcrypt from "bcryptjs"
import crypto from "crypto"
import { v4 as uuidv4 } from "uuid"
import type { UserModel } from "../interfaces/user-type.js"

const UserSchema: Schema = new Schema(
  {
    userId: {
      type: String,
      default: () => uuidv4(),
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ["admin", "user", "technician"],
      default: "user",
    },
    otp: String,
    otpExpire: Date,
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret: { __v?: any; _id?: any; userId?: any }) => {
        delete ret.__v
        delete ret._id
        delete ret.userId
        return ret
      },
    },
  }
)

// Encrypt password using bcrypt
UserSchema.pre<UserModel>("save", async function (next) {
  if (!this.isModified("password")) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password)
}

// Generate and hash password token
UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex")
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex")

  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000 // 10 minutes

  return resetToken
}

// Add method to generate OTP
UserSchema.methods.generateOTP = function () {
  this.otp = Math.floor(100000 + Math.random() * 900000).toString()
  this.otpExpire = Date.now() + 10 * 60 * 1000 // 10 minutes
  return this.otp
}

// Create a compound index for email and role to ensure uniqueness for the combination
UserSchema.index({ email: 1, role: 1 }, { unique: true })

export default mongoose.model<UserModel>("User", UserSchema)
