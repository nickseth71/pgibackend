"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const equipment_ts_1 = __importDefault(require("../models/equipment.ts"));
class EquipmentService {
    async createEquipment(equipmentData) {
        const equipment = new equipment_ts_1.default(equipmentData);
        return await equipment.save();
    }
    async getEquipmentById(id) {
        return equipment_ts_1.default.findById(id);
    }
    async getAllEquipment(filter = {}, paginationOptions) {
        const { page = 1, limit = 10, sort = "-createdAt", } = paginationOptions || {};
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            equipment_ts_1.default.find(filter).sort(sort).skip(skip).limit(limit).exec(),
            equipment_ts_1.default.countDocuments(filter),
        ]);
        return { data, total };
    }
    async updateEquipment(id, updateData) {
        return equipment_ts_1.default.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });
    }
    async deleteEquipment(id) {
        return equipment_ts_1.default.findByIdAndDelete(id);
    }
    async getEquipmentByStatus(status) {
        return equipment_ts_1.default.find({ status });
    }
    async getEquipmentDueForMaintenance() {
        const today = new Date();
        return equipment_ts_1.default.find({
            maintenanceExpiry: { $lte: today },
            status: { $ne: "Non-Functional" },
        });
    }
}
exports.default = new EquipmentService();
//# sourceMappingURL=equipment-service.js.map