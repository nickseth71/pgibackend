import jwt from "jsonwebtoken"
import type { Response } from "express"
import type { UserModel } from "../interfaces/user-type.js"
import dotenv from "dotenv"

dotenv.config()


const secret = process.env.JWT_SECRET
const expiresIn = process.env.JWT_EXPIRE

export const generateToken = (userId: string) => {
  if (!secret) {
    throw new Error("JWT_SECRET is not defined")
  }
  return jwt.sign({ _id: userId }, secret, {
    expiresIn: expiresIn || "1d",
  } as jwt.SignOptions);
}

export const sendTokenResponse = (
  user: UserModel,
  statusCode: number,
  res: Response
) => {
  const token = generateToken(user._id)

  const options = {
    expires: new Date(
      Date.now() +
        parseInt(process.env.JWT_COOKIE_EXPIRE as string) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  }

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
  })
}
