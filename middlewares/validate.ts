import type { Request, Response, NextFunction } from "express"
import Joi from "joi"

const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false })
    if (error) {
      const errors = error.details.map((detail) => detail.message)
      return res.status(400).json({ errors })
    }
    next()
  }
}

export default validate
