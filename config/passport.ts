import passport from "passport"
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt"
import User from "../models/user.js"
import { config } from "dotenv"

config()

// Validate JWT_SECRET exists
const jwtSecret = process.env.JWT_SECRET
if (!jwtSecret) {
  throw new Error("JWT_SECRET is not defined in environment variables")
}

// JWT Strategy
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
    },
    async (payload, done) => {
      try {
        const user = await User.findById(payload.id)
        if (user) {
          return done(null, user)
        }
        return done(null, false)
      } catch (error) {
        done(error, false)
      }
    }
  )
)

export default passport
