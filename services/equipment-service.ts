import mongoose from "mongoose"
import Equipment from "../models/equipment.js"
import type { PaginationOptions } from "../interfaces/pagination.js"
import type { EquipmentModel } from "../interfaces/equipment-type.js"

class EquipmentService {
  async createEquipment(
    equipmentData: Partial<EquipmentModel>
  ): Promise<EquipmentModel> {
    const equipment = new Equipment(equipmentData)
    return await equipment.save()
  }

  async getEquipmentById(id: string): Promise<EquipmentModel | null> {
    return Equipment.findById(id)
  }

  async getAllEquipment(
    filter: mongoose.FilterQuery<EquipmentModel> = {},
    paginationOptions?: PaginationOptions
  ): Promise<{ data: EquipmentModel[]; total: number }> {
    const {
      page = 1,
      limit = 10,
      sort = "-createdAt",
    } = paginationOptions || {}
    const skip = (page - 1) * limit

    const [data, total] = await Promise.all([
      Equipment.find(filter).sort(sort).skip(skip).limit(limit).exec(),
      Equipment.countDocuments(filter),
    ])

    return { data, total }
  }

  async updateEquipment(
    id: string,
    updateData: mongoose.UpdateQuery<EquipmentModel>
  ): Promise<EquipmentModel | null> {
    return Equipment.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })
  }

  async deleteEquipment(id: string): Promise<EquipmentModel | null> {
    return Equipment.findByIdAndDelete(id)
  }

  async getEquipmentByStatus(status: string): Promise<EquipmentModel[]> {
    return Equipment.find({ status })
  }

  async getEquipmentDueForMaintenance(): Promise<EquipmentModel[]> {
    const today = new Date()
    return Equipment.find({
      maintenanceExpiry: { $lte: today },
      status: { $ne: "Non-Functional" },
    })
  }
}

export default new EquipmentService()
