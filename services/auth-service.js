"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_ts_1 = __importDefault(require("../models/user.ts"));
const error_response_ts_1 = __importDefault(require("../utils/error-response.ts"));
class AuthService {
    async registerUser(name, email, password, role) {
        const existingUser = await user_ts_1.default.findOne({ email });
        if (existingUser) {
            throw new error_response_ts_1.default("User already exists", 400);
        }
        const user = await user_ts_1.default.create({ name, email, password, role });
        return user;
    }
    async loginUser(email, password) {
        const user = await user_ts_1.default.findOne({ email }).select("+password");
        if (!user) {
            throw new error_response_ts_1.default("Invalid credentials", 401);
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            throw new error_response_ts_1.default("Invalid credentials", 401);
        }
        return user;
    }
    async getCurrentUser(userId) {
        const user = await user_ts_1.default.findById(userId);
        if (!user) {
            throw new error_response_ts_1.default("User not found", 404);
        }
        return user;
    }
    async updateUserDetails(userId, fieldsToUpdate) {
        const allowedFields = ["name"];
        const invalidFields = Object.keys(fieldsToUpdate).filter((key) => !allowedFields.includes(key));
        if (invalidFields.length > 0) {
            throw new Error("You can only update your name.");
        }
        const fields = {};
        if (fieldsToUpdate.name) {
            fields.name = fieldsToUpdate.name;
        }
        const user = await user_ts_1.default.findByIdAndUpdate(userId, fields, {
            new: true,
            runValidators: true,
        });
        return user;
    }
    async generateOTP(userId) {
        const user = await user_ts_1.default.findById(userId);
        if (!user)
            throw new error_response_ts_1.default("User not found", 404);
        user.generateOTP();
        await user.save();
        return user;
    }
    async generateOTPByEmail(email) {
        const user = await user_ts_1.default.findOne({ email });
        if (!user)
            throw new error_response_ts_1.default("User not found", 404);
        return this.generateOTP(user._id);
    }
    async verifyOTPAndUpdatePassword(email, otp, password) {
        const user = await user_ts_1.default.findOne({
            email,
            otp,
            otpExpire: { $gt: Date.now() },
        });
        if (!user)
            throw new error_response_ts_1.default("Invalid or expired OTP", 400);
        user.password = password;
        user.otp = undefined;
        user.otpExpire = undefined;
        await user.save();
        return user;
    }
    async verifyOTPAndUpdateEmail(email, otp, newEmail) {
        const user = await user_ts_1.default.findOne({
            email: email,
            otp,
            otpExpire: { $gt: Date.now() },
        });
        if (!user)
            throw new error_response_ts_1.default("Invalid or expired OTP", 400);
        user.email = newEmail;
        user.otp = undefined;
        user.otpExpire = undefined;
        await user.save();
        return user;
    }
}
exports.default = new AuthService();
//# sourceMappingURL=auth-service.js.map