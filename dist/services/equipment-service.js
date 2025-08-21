import Equipment from "../models/equipment.ts";
class EquipmentService {
    async createEquipment(equipmentData) {
        const equipment = new Equipment(equipmentData);
        return await equipment.save();
    }
    async getEquipmentById(id) {
        return Equipment.findById(id);
    }
    async getAllEquipment(filter = {}, paginationOptions) {
        const { page = 1, limit = 10, sort = "-createdAt", } = paginationOptions || {};
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            Equipment.find(filter).sort(sort).skip(skip).limit(limit).exec(),
            Equipment.countDocuments(filter),
        ]);
        return { data, total };
    }
    async updateEquipment(id, updateData) {
        return Equipment.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });
    }
    async deleteEquipment(id) {
        return Equipment.findByIdAndDelete(id);
    }
    async getEquipmentByStatus(status) {
        return Equipment.find({ status });
    }
    async getEquipmentDueForMaintenance() {
        const today = new Date();
        return Equipment.find({
            maintenanceExpiry: { $lte: today },
            status: { $ne: "Non-Functional" },
        });
    }
}
export default new EquipmentService();
//# sourceMappingURL=equipment-service.js.map