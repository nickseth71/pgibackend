"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.authValidation = {
    register: joi_1.default.object({
        name: joi_1.default.string().required(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(6).required(),
        role: joi_1.default.string().valid("admin", "user", "technician").default("user"),
    }),
    login: joi_1.default.object({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().required(),
    }),
    forgotPassword: joi_1.default.object({
        email: joi_1.default.string().email().required(),
    }),
    resetPassword: joi_1.default.object({
        password: joi_1.default.string().min(6).required(),
    }),
};
//# sourceMappingURL=auth-validation.js.map