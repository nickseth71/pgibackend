import User from "../models/user.js";
import ErrorResponse from "../utils/error-response.js";
class AuthService {
    async registerUser(name, email, password, role) {
        const sanitizedEmail = email.trim().toLowerCase();
        const existingUser = await User.findOne({
            email: sanitizedEmail,
            role: role,
        });
        if (existingUser) {
            throw new ErrorResponse(`An account with email ${sanitizedEmail} and role ${role} already exists.`, 400);
        }
        const userData = {
            name,
            email: sanitizedEmail,
            password,
            role,
        };
        try {
            const user = await User.create(userData);
            return user;
        }
        catch (error) {
            console.error("User registration error:", error);
            if (error.code === 11000) {
                const keyValue = error.keyValue;
                const duplicateField = Object.keys(keyValue)[0];
                const duplicateValue = keyValue[duplicateField];
                throw new ErrorResponse(`Duplicate value for ${duplicateField}: ${duplicateValue}`, 400);
            }
            throw error;
        }
    }
    async loginUser(email, password) {
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            throw new ErrorResponse("Invalid credentials", 401);
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            throw new ErrorResponse("Invalid credentials", 401);
        }
        return user;
    }
    async getCurrentUser(userId) {
        const user = await User.findOne({ userId: userId });
        if (!user) {
            throw new ErrorResponse("User not found", 404);
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
        const user = await User.findOneAndUpdate({ userId: userId }, fields, {
            new: true,
            runValidators: true,
        });
        if (!user) {
            throw new ErrorResponse("User not found", 404);
        }
        return user;
    }
    async generateOTP(userId) {
        const user = await User.findOne({ userId: userId });
        if (!user)
            throw new ErrorResponse("User not found", 404);
        user.generateOTP();
        await user.save();
        return user;
    }
    async generateOTPByEmail(email) {
        const user = await User.findOne({ email });
        if (!user)
            throw new ErrorResponse("User not found", 404);
        return this.generateOTP(user.userId);
    }
    async verifyOTPAndUpdatePassword(email, otp, password) {
        const user = await User.findOne({
            email,
            otp,
            otpExpire: { $gt: Date.now() },
        });
        if (!user)
            throw new ErrorResponse("Invalid or expired OTP", 400);
        user.password = password;
        user.otp = undefined;
        user.otpExpire = undefined;
        await user.save();
        return user;
    }
    async verifyOTPAndUpdateEmail(email, otp, newEmail) {
        const user = await User.findOne({
            email: email,
            otp,
            otpExpire: { $gt: Date.now() },
        });
        if (!user)
            throw new ErrorResponse("Invalid or expired OTP", 400);
        user.email = newEmail;
        user.otp = undefined;
        user.otpExpire = undefined;
        await user.save();
        return user;
    }
}
export default new AuthService();
//# sourceMappingURL=auth-service.js.map