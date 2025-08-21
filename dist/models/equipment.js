"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const EquipmentSchema = new mongoose_1.Schema({
    name: {
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
        type: Date,
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
        type: Date,
    },
    inchargeName: {
        type: String,
        required: [true, "Please add incharge name"],
        default: "Not Assigned",
    },
    contactInfo: {
        phone: { type: String },
        email: { type: String },
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
const Equipment = mongoose_1.default.model("Equipment", EquipmentSchema);
exports.default = Equipment;
//# sourceMappingURL=equipment.js.map