import EquipmentService from "../services/equipment-service.ts";
import httpStatus from "http-status";
import ErrorResponse from "../utils/error-response.ts";
import asyncHandler from "../middlewares/async-handler.ts";
class EquipmentController {
    constructor() {
        this.createEquipment = asyncHandler(async (req, res) => {
            const equipment = await EquipmentService.createEquipment(req.body);
            res.status(httpStatus.CREATED).json(equipment);
        });
        this.getEquipment = asyncHandler(async (req, res) => {
            const equipment = await EquipmentService.getEquipmentById(req.params.id);
            if (!equipment) {
                throw new ErrorResponse("Equipment not found", httpStatus.NOT_FOUND);
            }
            res.status(httpStatus.OK).json(equipment);
        });
        this.getAllEquipment = asyncHandler(async (req, res) => {
            const { page = 1, limit = 10, sort = "-createdAt", ...filter } = req.query;
            const paginationOptions = {
                page: parseInt(page),
                limit: parseInt(limit),
                sort: sort,
            };
            const { data, total } = await EquipmentService.getAllEquipment(filter, paginationOptions);
            res.status(httpStatus.OK).json({
                data,
                pagination: {
                    page: paginationOptions.page,
                    limit: paginationOptions.limit,
                    total,
                    pages: Math.ceil(total / (paginationOptions?.limit || 10)),
                },
            });
        });
        this.updateEquipment = asyncHandler(async (req, res) => {
            const equipment = await EquipmentService.updateEquipment(req.params.id, req.body);
            if (!equipment) {
                throw new ErrorResponse("Equipment not found", httpStatus.NOT_FOUND);
            }
            res.status(httpStatus.OK).json(equipment);
        });
        this.deleteEquipment = asyncHandler(async (req, res) => {
            const equipment = await EquipmentService.deleteEquipment(req.params.id);
            if (!equipment) {
                throw new ErrorResponse("Equipment not found", httpStatus.NOT_FOUND);
            }
            res
                .status(httpStatus.OK)
                .json({ message: "Equipment deleted successfully" });
        });
        this.getEquipmentByStatus = asyncHandler(async (req, res) => {
            const equipment = await EquipmentService.getEquipmentByStatus(req.params.status);
            res.status(httpStatus.OK).json(equipment);
        });
        this.getEquipmentDueForMaintenance = asyncHandler(async (req, res) => {
            const equipment = await EquipmentService.getEquipmentDueForMaintenance();
            res.status(httpStatus.OK).json(equipment);
        });
    }
}
export default new EquipmentController();
//# sourceMappingURL=equipment-controller.js.map