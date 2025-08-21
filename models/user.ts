import mongoose, { Schema } from "mongoose"
import bcrypt from "bcryptjs"
import crypto from "crypto"
import type { UserModel } from "../interfaces/user-type.js"

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  otp: String,
  otpExpire: Date,
})

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
UserSchema.methods.generateOTP = function() {
  this.otp = Math.floor(100000 + Math.random() * 900000).toString();
  this.otpExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
  return this.otp;
};

UserSchema.virtual('id').get(function() {
  return this._id.toString();
});

UserSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    delete ret._id;
    delete ret.__v;
  }
});

export default mongoose.model<UserModel>("User", UserSchema)
