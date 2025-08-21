import { Router } from "express";
import HealthCheckController from "../controllers/health-check-controller.ts";
const router = Router();
router.get("/", HealthCheckController.checkHealth);
router.get("/db", HealthCheckController.checkDbHealth);
export default router;
//# sourceMappingURL=health-check-routes.js.map