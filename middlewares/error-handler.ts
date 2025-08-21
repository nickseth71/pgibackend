import type { Request, Response, NextFunction } from "express"
import ErrorResponse from "../utils/error-response.js"

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack)

  let error = { ...err } as ErrorResponse
  error.message = err.message

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    const message = `Resource not found with id of ${(err as any).value}`
    error = new ErrorResponse(message, 404)
  }

  // Mongoose duplicate key
  if ((err as any).code === 11000) {
    // Extract the duplicate key value from the error
    const keyValue = (err as any).keyValue
    const duplicateField = keyValue ? Object.keys(keyValue)[0] : ""
    const duplicateValue = keyValue ? keyValue[duplicateField] : ""
    const message =
      duplicateField && duplicateValue
        ? `Duplicate value for ${duplicateField}: ${duplicateValue}`
        : "Duplicate field value entered"
    error = new ErrorResponse(message, 400)
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const messages = Object.values((err as any).errors).map(
      (val: any) => val.message
    )
    const message = messages.join("/n")
    error = new ErrorResponse(message, 400)
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  })
}

export default errorHandler
