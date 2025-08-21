"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const equipment_controller_ts_1 = __importDefault(require("../controllers/equipment-controller.ts"));
const auth_middleware_ts_1 = require("../middlewares/auth-middleware.ts");
const validate_ts_1 = __importDefault(require("../middlewares/validate.ts"));
const equipment_validation_ts_1 = require("../validations/equipment-validation.ts");
const router = (0, express_1.Router)();
router.use(auth_middleware_ts_1.protect);
router
    .route("/")
    .post((0, auth_middleware_ts_1.authorize)("admin", "technician"), (0, validate_ts_1.default)(equipment_validation_ts_1.equipmentValidation.createEquipment), equipment_controller_ts_1.default.createEquipment)
    .get(equipment_controller_ts_1.default.getAllEquipment);
router
    .route("/:id")
    .get(equipment_controller_ts_1.default.getEquipment)
    .put((0, auth_middleware_ts_1.authorize)("admin", "technician"), (0, validate_ts_1.default)(equipment_validation_ts_1.equipmentValidation.updateEquipment), equipment_controller_ts_1.default.updateEquipment)
    .delete((0, auth_middleware_ts_1.authorize)("admin"), equipment_controller_ts_1.default.deleteEquipment);
router.route("/status/:status").get(equipment_controller_ts_1.default.getEquipmentByStatus);
router
    .route("/maintenance/due")
    .get((0, auth_middleware_ts_1.authorize)("admin", "technician"), equipment_controller_ts_1.default.getEquipmentDueForMaintenance);
exports.default = router;
//# sourceMappingURL=equipment-routes.js.map