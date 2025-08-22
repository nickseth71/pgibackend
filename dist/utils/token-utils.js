import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const secret = process.env.JWT_SECRET;
const expiresIn = process.env.JWT_EXPIRE;
export const generateToken = (userId) => {
    if (!secret) {
        throw new Error("JWT_SECRET is not defined");
    }
    return jwt.sign({ userId }, secret, {
        expiresIn: expiresIn || "1d",
    });
};
export const sendTokenResponse = (user, statusCode, res) => {
    const token = generateToken(user.userId);
    const options = {
        expires: new Date(Date.now() +
            parseInt(process.env.JWT_COOKIE_EXPIRE) * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    };
    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        token,
    });
};
//# sourceMappingURL=token-utils.js.map