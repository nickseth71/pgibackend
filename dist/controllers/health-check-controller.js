import mongoose from "mongoose";
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
            const db = mongoose.connection.db;
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
export default HealthCheckController;
//# sourceMappingURL=health-check-controller.js.map