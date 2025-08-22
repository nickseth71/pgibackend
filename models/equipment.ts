import mongoose, { Schema } from "mongoose"
import type { EquipmentModel } from "../interfaces/equipment-type.js"
import { v4 as uuidv4 } from "uuid"

const EquipmentSchema: Schema = new Schema(
  {
    id: {
      type: String,
      default: () => uuidv4(),
      required: true,
      unique: true,
    },
    equipmentName: {
      type: String,
      required: [true, "Please add equipment name"],
    },
    modelName: {
      type: String,
      required: [true, "Please add equipment model"],
    },
    procurementYear: {
      type: String,
      required: [true, "Please add procurement year"],
    },
    installationDate: {
      type: String,
      required: [true, "Please add installation date"],
    },
    status: {
      type: String,
      required: true,
      enum: [
        "Functional",
        "Non-Functional",
        "Partially Functional",
        "Under Maintenance",
        "End of Life Span",
      ],
      default: "Functional",
    },
    maintenanceType: {
      type: String,
      required: true,
      enum: ["CMC", "AMC", "None"],
      default: "None",
    },
    maintenanceExpiry: {
      type: String,
    },
    inchargeName: {
      type: String,
      required: [true, "Please add incharge name"],
      default: "Not Assigned",
    },
    contactInfo: {
      name: { type: String },
      phone: { type: String },
      email: { type: String },
    },
    department: {
      type: String,
      default: null,
    },
    remark: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret: { __v?: any; _id?: any }) => {
        delete ret.__v
        delete ret._id
        return ret
      },
    },
  }
)

// Indexes for better query performance
EquipmentSchema.index({ name: 1 })
EquipmentSchema.index({ modelName: 1 })
EquipmentSchema.index({ status: 1 })
EquipmentSchema.index({ maintenanceType: 1 })
EquipmentSchema.index({ maintenanceExpiry: 1 })

const Equipment = mongoose.model<EquipmentModel>("Equipment", EquipmentSchema)

export default Equipment
