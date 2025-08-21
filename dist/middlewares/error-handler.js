"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_response_ts_1 = __importDefault(require("../utils/error-response.ts"));
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    let error = { ...err };
    error.message = err.message;
    if (err.name === "CastError") {
        const message = `Resource not found with id of ${err.value}`;
        error = new error_response_ts_1.default(message, 404);
    }
    if (err.code === 11000) {
        const message = "Duplicate field value entered";
        error = new error_response_ts_1.default(message, 400);
    }
    if (err.name === "ValidationError") {
        const messages = Object.values(err.errors).map((val) => val.message);
        const message = messages.join("/n");
        error = new error_response_ts_1.default(message, 400);
    }
    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || "Server Error",
    });
};
exports.default = errorHandler;
//# sourceMappingURL=error-handler.js.map