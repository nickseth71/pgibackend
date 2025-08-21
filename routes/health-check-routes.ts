import { Router } from "express"
import HealthCheckController from "../controllers/health-check-controller.js"

const router = Router()

router.get("/", HealthCheckController.checkHealth)
router.get("/db", HealthCheckController.checkDbHealth)

export default router
