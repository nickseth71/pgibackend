"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_ts_1 = __importDefault(require("../controllers/auth-controller.ts"));
const validate_ts_1 = __importDefault(require("../middlewares/validate.ts"));
const auth_validation_ts_1 = require("../validations/auth-validation.ts");
const auth_middleware_ts_1 = require("../middlewares/auth-middleware.ts");
const router = (0, express_1.Router)();
router.post("/register", (0, validate_ts_1.default)(auth_validation_ts_1.authValidation.register), auth_controller_ts_1.default.register);
router.post("/login", (0, validate_ts_1.default)(auth_validation_ts_1.authValidation.login), auth_controller_ts_1.default.login);
router.get("/logout", auth_controller_ts_1.default.logout);
router.get("/me", auth_middleware_ts_1.protect, auth_controller_ts_1.default.getMe);
router.put("/updatedetails", auth_middleware_ts_1.protect, auth_controller_ts_1.default.updateDetails);
router.post('/request-otp', auth_controller_ts_1.default.requestOTP);
router.put('/verify-otp-password', auth_controller_ts_1.default.verifyOTPAndUpdatePassword);
router.put('/verify-otp-email', auth_controller_ts_1.default.verifyOTPAndUpdateEmail);
exports.default = router;
//# sourceMappingURL=auth-routes.js.map