"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const async_handler_ts_1 = __importDefault(require("../middlewares/async-handler.ts"));
const token_utils_ts_1 = require("../utils/token-utils.ts");
const auth_service_ts_1 = __importDefault(require("../services/auth-service.ts"));
const error_response_ts_1 = __importDefault(require("../utils/error-response.ts"));
const email_service_ts_1 = require("../utils/email-service.ts");
class AuthController {
    constructor() {
        this.register = (0, async_handler_ts_1.default)(async (req, res, next) => {
            const { name, email, password, role } = req.body;
            const user = await auth_service_ts_1.default.registerUser(name, email, password, role);
            (0, token_utils_ts_1.sendTokenResponse)(user, 200, res);
        });
        this.login = (0, async_handler_ts_1.default)(async (req, res, next) => {
            const { email, password } = req.body;
            const user = await auth_service_ts_1.default.loginUser(email, password);
            (0, token_utils_ts_1.sendTokenResponse)(user, 200, res);
        });
        this.logout = (0, async_handler_ts_1.default)(async (req, res, next) => {
            res.cookie("token", "none", {
                expires: new Date(Date.now() + 10 * 1000),
                httpOnly: true,
            });
            res.status(200).json({ success: true, data: { message: "Successfully logged out" } });
        });
        this.getMe = (0, async_handler_ts_1.default)(async (req, res, next) => {
            const user = await auth_service_ts_1.default.getCurrentUser(req.user?._id);
            res.status(200).json({ success: true, data: user });
        });
        this.updateDetails = (0, async_handler_ts_1.default)(async (req, res, next) => {
            if (!req.user) {
                return next(new error_response_ts_1.default("Not authorized", 401));
            }
            const updatedUser = await auth_service_ts_1.default.updateUserDetails(req.user?._id, req.body);
            res.status(200).json({ success: true, data: updatedUser });
        });
        this.requestOTP = (0, async_handler_ts_1.default)(async (req, res, next) => {
            if (!req.body || !req.body.email) {
                throw new error_response_ts_1.default("Email is required", 400);
            }
            const user = await auth_service_ts_1.default.generateOTPByEmail(req.body.email);
            await (0, email_service_ts_1.sendOTPEmail)(user.email, user.otp);
            res.status(200).json({ success: true, message: "OTP sent to email" });
        });
        this.verifyOTPAndUpdatePassword = (0, async_handler_ts_1.default)(async (req, res, next) => {
            const user = await auth_service_ts_1.default.verifyOTPAndUpdatePassword(req.body.email, req.body.otp, req.body.password);
            (0, token_utils_ts_1.sendTokenResponse)(user, 200, res);
        });
        this.verifyOTPAndUpdateEmail = (0, async_handler_ts_1.default)(async (req, res, next) => {
            const user = await auth_service_ts_1.default.verifyOTPAndUpdateEmail(req.body.email, req.body.otp, req.body.newEmail);
            res.status(200).json({ success: true, data: user });
        });
    }
}
exports.default = new AuthController();
//# sourceMappingURL=auth-controller.js.map