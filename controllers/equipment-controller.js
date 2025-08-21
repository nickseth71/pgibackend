"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const equipment_service_ts_1 = __importDefault(require("../services/equipment-service.ts"));
const http_status_1 = __importDefault(require("http-status"));
const error_response_ts_1 = __importDefault(require("../utils/error-response.ts"));
const async_handler_ts_1 = __importDefault(require("../middlewares/async-handler.ts"));
class EquipmentController {
    constructor() {
        this.createEquipment = (0, async_handler_ts_1.default)(async (req, res) => {
            const equipment = await equipment_service_ts_1.default.createEquipment(req.body);
            res.status(http_status_1.default.CREATED).json(equipment);
        });
        this.getEquipment = (0, async_handler_ts_1.default)(async (req, res) => {
            const equipment = await equipment_service_ts_1.default.getEquipmentById(req.params.id);
            if (!equipment) {
                throw new error_response_ts_1.default("Equipment not found", http_status_1.default.NOT_FOUND);
            }
            res.status(http_status_1.default.OK).json(equipment);
        });
        this.getAllEquipment = (0, async_handler_ts_1.default)(async (req, res) => {
            const { page = 1, limit = 10, sort = "-createdAt", ...filter } = req.query;
            const paginationOptions = {
                page: parseInt(page),
                limit: parseInt(limit),
                sort: sort,
            };
            const { data, total } = await equipment_service_ts_1.default.getAllEquipment(filter, paginationOptions);
            res.status(http_status_1.default.OK).json({
                data,
                pagination: {
                    page: paginationOptions.page,
                    limit: paginationOptions.limit,
                    total,
                    pages: Math.ceil(total / (paginationOptions?.limit || 10)),
                },
            });
        });
        this.updateEquipment = (0, async_handler_ts_1.default)(async (req, res) => {
            const equipment = await equipment_service_ts_1.default.updateEquipment(req.params.id, req.body);
            if (!equipment) {
                throw new error_response_ts_1.default("Equipment not found", http_status_1.default.NOT_FOUND);
            }
            res.status(http_status_1.default.OK).json(equipment);
        });
        this.deleteEquipment = (0, async_handler_ts_1.default)(async (req, res) => {
            const equipment = await equipment_service_ts_1.default.deleteEquipment(req.params.id);
            if (!equipment) {
                throw new error_response_ts_1.default("Equipment not found", http_status_1.default.NOT_FOUND);
            }
            res
                .status(http_status_1.default.OK)
                .json({ message: "Equipment deleted successfully" });
        });
        this.getEquipmentByStatus = (0, async_handler_ts_1.default)(async (req, res) => {
            const equipment = await equipment_service_ts_1.default.getEquipmentByStatus(req.params.status);
            res.status(http_status_1.default.OK).json(equipment);
        });
        this.getEquipmentDueForMaintenance = (0, async_handler_ts_1.default)(async (req, res) => {
            const equipment = await equipment_service_ts_1.default.getEquipmentDueForMaintenance();
            res.status(http_status_1.default.OK).json(equipment);
        });
    }
}
exports.default = new EquipmentController();
//# sourceMappingURL=equipment-controller.js.map