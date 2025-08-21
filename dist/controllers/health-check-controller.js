"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class HealthCheckController {
    static async checkHealth(req, res) {
        res.status(200).json({
            status: "UP",
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            environment: process.env.NODE_ENV,
        });
    }
    static async checkDbHealth(req, res) {
        try {
            const db = mongoose_1.default.connection.db;
            if (!db) {
                return res.status(503).json({
                    database: "DOWN",
                    error: "Database connection not established",
                });
            }
            await db.admin().ping();
            res.status(200).json({
                database: "UP",
                timestamp: new Date().toISOString(),
            });
        }
        catch (error) {
            res.status(503).json({
                database: "DOWN",
                error: error instanceof Error ? error.message : "Unknown error",
            });
        }
    }
}
exports.default = HealthCheckController;
//# sourceMappingURL=health-check-controller.js.map