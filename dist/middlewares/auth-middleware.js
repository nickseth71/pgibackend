import ErrorResponse from "../utils/error-response.js";
import asyncHandler from "./async-handler.js";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import dotenv from "dotenv";
dotenv.config();
export const protect = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return next(new ErrorResponse("Not authorized to access this route", 401));
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded._id);
        if (!user) {
            return next(new ErrorResponse("Not authorized to access this route", 401));
        }
        req.user = user;
        next();
    }
    catch (err) {
        return next(new ErrorResponse("Not authorized to access this route", 401));
    }
});
export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return next(new ErrorResponse("Not authorized to access this route", 401));
        }
        if (!roles.includes(req.user.role)) {
            return next(new ErrorResponse(`User role ${req.user.role} is not authorized to access this route`, 403));
        }
        next();
    };
};
//# sourceMappingURL=auth-middleware.js.map