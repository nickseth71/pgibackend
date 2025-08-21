"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const health_check_controller_ts_1 = __importDefault(require("../controllers/health-check-controller.ts"));
const router = (0, express_1.Router)();
router.get("/", health_check_controller_ts_1.default.checkHealth);
router.get("/db", health_check_controller_ts_1.default.checkDbHealth);
exports.default = router;
//# sourceMappingURL=health-check-routes.js.map