import Joi from "joi"

export const authValidation = {
  register: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(6)
      .required()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
      )
      .message(
        "Password must contain at least one uppercase letter, one number, and one special character."
      ),
    role: Joi.string().valid("admin", "user", "technician").default("user"),
  }),

  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),

  forgotPassword: Joi.object({
    email: Joi.string().email().required(),
  }),

  resetPassword: Joi.object({
    password: Joi.string().min(6).required(),
  }),
}
