"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.protect = void 0;
const error_response_ts_1 = __importDefault(require("../utils/error-response.ts"));
const async_handler_ts_1 = __importDefault(require("./async-handler.ts"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_ts_1 = __importDefault(require("../models/user.ts"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.protect = (0, async_handler_ts_1.default)(async (req, res, next) => {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return next(new error_response_ts_1.default("Not authorized to access this route", 401));
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = await user_ts_1.default.findById(decoded._id);
        if (!user) {
            return next(new error_response_ts_1.default("Not authorized to access this route", 401));
        }
        req.user = user;
        next();
    }
    catch (err) {
        return next(new error_response_ts_1.default("Not authorized to access this route", 401));
    }
});
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return next(new error_response_ts_1.default("Not authorized to access this route", 401));
        }
        if (!roles.includes(req.user.role)) {
            return next(new error_response_ts_1.default(`User role ${req.user.role} is not authorized to access this route`, 403));
        }
        next();
    };
};
exports.authorize = authorize;
//# sourceMappingURL=auth-middleware.js.map