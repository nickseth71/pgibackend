import { Router } from "express";
import AuthController from "../controllers/auth-controller.ts";
import validate from "../middlewares/validate.ts";
import { authValidation } from "../validations/auth-validation.ts";
import { protect } from "../middlewares/auth-middleware.ts";
const router = Router();
router.post("/register", validate(authValidation.register), AuthController.register);
router.post("/login", validate(authValidation.login), AuthController.login);
router.get("/logout", AuthController.logout);
router.get("/me", protect, AuthController.getMe);
router.put("/updatedetails", protect, AuthController.updateDetails);
router.post('/request-otp', AuthController.requestOTP);
router.put('/verify-otp-password', AuthController.verifyOTPAndUpdatePassword);
router.put('/verify-otp-email', AuthController.verifyOTPAndUpdateEmail);
export default router;
//# sourceMappingURL=auth-routes.js.map