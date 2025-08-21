"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendTokenResponse = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secret = process.env.JWT_SECRET;
const expiresIn = process.env.JWT_EXPIRE;
const generateToken = (userId) => {
    if (!secret) {
        throw new Error("JWT_SECRET is not defined");
    }
    return jsonwebtoken_1.default.sign({ _id: userId }, secret, {
        expiresIn: expiresIn || "1d",
    });
};
exports.generateToken = generateToken;
const sendTokenResponse = (user, statusCode, res) => {
    const token = (0, exports.generateToken)(user._id);
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
exports.sendTokenResponse = sendTokenResponse;
//# sourceMappingURL=token-utils.js.map