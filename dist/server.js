"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = require("dotenv");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const passport_1 = __importDefault(require("passport"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const equipment_routes_ts_1 = __importDefault(require("./routes/equipment-routes.ts"));
const health_check_routes_ts_1 = __importDefault(require("./routes/health-check-routes.ts"));
const auth_routes_ts_1 = __importDefault(require("./routes/auth-routes.ts"));
const error_handler_ts_1 = __importDefault(require("./middlewares/error-handler.ts"));
const database_ts_1 = __importDefault(require("./config/database.ts"));
require("./config/passport.ts");
const swagger_ts_1 = require("./config/swagger.ts");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(passport_1.default.initialize());
app.use((0, cookie_parser_1.default)());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)("combined"));
app.use((0, cors_1.default)({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use((0, express_rate_limit_1.default)({
    windowMs: parseInt(process.env.API_RATE_LIMIT_WINDOW_MS || "900000"),
    max: parseInt(process.env.API_RATE_LIMIT || "100"),
}));
app.use("/api/v1/auth", auth_routes_ts_1.default);
app.use("/api/v1/equipment", equipment_routes_ts_1.default);
app.use("/health", health_check_routes_ts_1.default);
if (process.env.NODE_ENV === "development") {
    (0, swagger_ts_1.setupSwagger)(app);
}
app.use(error_handler_ts_1.default);
const startServer = async () => {
    try {
        await (0, database_ts_1.default)();
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
            console.log(`MongoDB connected successfully`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=server.js.map