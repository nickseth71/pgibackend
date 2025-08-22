import type { NextFunction } from "express"
import type { ExpressRequest, ExpressResponse } from "../types/express.js"
import ErrorResponse from "../utils/error-response.js"
import asyncHandler from "./async-handler.js"
import jwt from "jsonwebtoken"
import User from "../models/user.js"
import dotenv from "dotenv"

dotenv.config()

// Protect routes - user must be logged in
export const protect = asyncHandler(
  async (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
    let token: string

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1]
    } 
    // else if (req.cookies.token) {
    //   token = req.cookies.token
    // }

    if (!token) {
      return next(new ErrorResponse("Not authorized to access this route", 401))
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
        userId: string
      }
      const user = await User.findOne({ userId: decoded.userId })
      if (!user) {
        return next(
          new ErrorResponse("Not authorized to access this route", 401)
        )
      }
      req.user = user
      next()
    } catch (err) {
      return next(new ErrorResponse("Not authorized to access this route", 401))
    }
  }
)

// Grant access to specific roles
export const authorize = (...roles: string[]) => {
  return (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
    if (!req.user) {
      return next(new ErrorResponse("Not authorized to access this route", 401))
    }
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} is not authorized to access this route`,
          403
        )
      )
    }
    next()
  }
}
