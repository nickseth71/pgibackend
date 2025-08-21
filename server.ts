import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { config } from "dotenv"
import cookieParser from "cookie-parser"
import passport from "passport"
import rateLimit from "express-rate-limit"
import equipmentRoutes from "./routes/equipment-routes.js"
import healthCheckRoutes from "./routes/health-check-routes.js"
import authRoutes from "./routes/auth-routes.js"
import errorHandler from "./middlewares/error-handler.js"
import connectDB from "./config/database.js"
import "./config/passport.js"
import { setupSwagger } from "./config/swagger.js"

config()

const app = express()
const port = process.env.PORT || 3000

app.use(helmet())
app.use(morgan("dev"))
app.use(express.json())
app.use(passport.initialize())
app.use(cookieParser())
app.use(helmet())
app.use(morgan("combined"))

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
)

app.use(
  rateLimit({
    windowMs: parseInt(process.env.API_RATE_LIMIT_WINDOW_MS || "900000"),
    max: parseInt(process.env.API_RATE_LIMIT || "100"),
  })
)

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/equipment", equipmentRoutes)
app.use("/health", healthCheckRoutes)

if (process.env.NODE_ENV === "development") {
  setupSwagger(app)
}
app.use(errorHandler)

const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      console.log(`MongoDB connected successfully`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
