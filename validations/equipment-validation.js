"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.equipmentValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const contactInfoSchema = joi_1.default.object({
    phone: joi_1.default.string().allow(null, ""),
    email: joi_1.default.string().email().allow(null, ""),
});
exports.equipmentValidation = {
    createEquipment: joi_1.default.object({
        name: joi_1.default.string().required(),
        modelName: joi_1.default.string().required(),
        procurementYear: joi_1.default.string().required(),
        installationDate: joi_1.default.date().required(),
        status: joi_1.default.string()
            .valid("Functional", "Non-Functional", "Partially Functional", "Under Maintenance")
            .required(),
        maintenanceType: joi_1.default.string().valid("CMC", "AMC", "None").required(),
        maintenanceExpiry: joi_1.default.date().when("maintenanceType", {
            is: joi_1.default.not("None"),
            then: joi_1.default.required(),
            otherwise: joi_1.default.optional(),
        }),
        inchargeName: joi_1.default.string().required(),
        contactInfo: contactInfoSchema,
    }),
    updateEquipment: joi_1.default.object({
        name: joi_1.default.string(),
        modelName: joi_1.default.string(),
        procurementYear: joi_1.default.string(),
        installationDate: joi_1.default.date(),
        status: joi_1.default.string().valid("Functional", "Non-Functional", "Partially Functional", "Under Maintenance"),
        maintenanceType: joi_1.default.string().valid("CMC", "AMC", "None"),
        maintenanceExpiry: joi_1.default.date(),
        inchargeName: joi_1.default.string(),
        contactInfo: contactInfoSchema,
    }),
};
//# sourceMappingURL=equipment-validation.js.map