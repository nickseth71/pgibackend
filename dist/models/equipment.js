import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";
const EquipmentSchema = new Schema({
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
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (_doc, ret) => {
            delete ret.__v;
            delete ret._id;
            return ret;
        },
    },
});
EquipmentSchema.index({ name: 1 });
EquipmentSchema.index({ modelName: 1 });
EquipmentSchema.index({ status: 1 });
EquipmentSchema.index({ maintenanceType: 1 });
EquipmentSchema.index({ maintenanceExpiry: 1 });
const Equipment = mongoose.model("Equipment", EquipmentSchema);
export default Equipment;
//# sourceMappingURL=equipment.js.map