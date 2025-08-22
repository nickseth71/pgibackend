import asyncHandler from "../middlewares/async-handler.js";
import { sendTokenResponse } from "../utils/token-utils.js";
import AuthService from "../services/auth-service.js";
import ErrorResponse from "../utils/error-response.js";
import { sendOTPEmail } from "../utils/email-service.js";
class AuthController {
    constructor() {
        this.register = asyncHandler(async (req, res, next) => {
            const { name, email, password, role } = req.body;
            const user = await AuthService.registerUser(name, email, password, role);
            sendTokenResponse(user, 200, res);
        });
        this.login = asyncHandler(async (req, res, next) => {
            const { email, password } = req.body;
            const user = await AuthService.loginUser(email, password);
            sendTokenResponse(user, 200, res);
        });
        this.logout = asyncHandler(async (req, res, next) => {
            res.cookie("token", "none", {
                expires: new Date(Date.now() + 10 * 1000),
                httpOnly: true,
            });
            res
                .status(200)
                .json({ success: true, data: { message: "Successfully logged out" } });
        });
        this.getMe = asyncHandler(async (req, res, next) => {
            const user = await AuthService.getCurrentUser(req.user?.userId);
            const { _id, __v, ...userData } = user.toObject();
            res.status(200).json({ success: true, data: userData });
        });
        this.updateDetails = asyncHandler(async (req, res, next) => {
            if (!req.user) {
                return next(new ErrorResponse("Not authorized", 401));
            }
            const updatedUser = await AuthService.updateUserDetails(req.user?.userId, req.body);
            const { _id, __v, ...updatedUserData } = updatedUser.toObject();
            res.status(200).json({ success: true, data: updatedUserData });
        });
        this.requestOTP = asyncHandler(async (req, res, next) => {
            if (!req.body || !req.body.email) {
                throw new ErrorResponse("Email is required", 400);
            }
            const user = await AuthService.generateOTPByEmail(req.body.email);
            await sendOTPEmail(user.email, user.otp);
            res.status(200).json({ success: true, message: "OTP sent to email" });
        });
        this.verifyOTPAndUpdatePassword = asyncHandler(async (req, res, next) => {
            const user = await AuthService.verifyOTPAndUpdatePassword(req.body.email, req.body.otp, req.body.password);
            sendTokenResponse(user, 200, res);
        });
        this.verifyOTPAndUpdateEmail = asyncHandler(async (req, res, next) => {
            const user = await AuthService.verifyOTPAndUpdateEmail(req.body.email, req.body.otp, req.body.newEmail);
            res.status(200).json({ success: true, data: user });
        });
    }
}
export default new AuthController();
//# sourceMappingURL=auth-controller.js.map