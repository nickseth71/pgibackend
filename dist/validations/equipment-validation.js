import Joi from "joi";
const contactInfoSchema = Joi.object({
    name: Joi.string().allow(null, ""),
    phone: Joi.string().allow(null, ""),
    email: Joi.string().email().allow(null, ""),
});
export const equipmentValidation = {
    createEquipment: Joi.object({
        equipmentName: Joi.string().required(),
        modelName: Joi.string().required(),
        procurementYear: Joi.string().required(),
        installationDate: Joi.date().required(),
        status: Joi.string()
            .valid("Functional", "Non-Functional", "Partially Functional", "Under Maintenance", "End of Life Span")
            .required(),
        maintenanceType: Joi.string().valid("CMC", "AMC", "None").required(),
        maintenanceExpiry: Joi.date().when("maintenanceType", {
            is: Joi.not("None"),
            then: Joi.required(),
            otherwise: Joi.optional(),
        }),
        inchargeName: Joi.string().required(),
        contactInfo: contactInfoSchema,
        department: Joi.string().allow(null, ""),
        remark: Joi.string().allow(null, ""),
    }),
    updateEquipment: Joi.object({
        equipmentName: Joi.string(),
        modelName: Joi.string(),
        procurementYear: Joi.string(),
        installationDate: Joi.date(),
        status: Joi.string().valid("Functional", "Non-Functional", "Partially Functional", "Under Maintenance", "End of Life Span"),
        maintenanceType: Joi.string().valid("CMC", "AMC", "None"),
        maintenanceExpiry: Joi.date(),
        inchargeName: Joi.string(),
        contactInfo: contactInfoSchema,
    }),
};
//# sourceMappingURL=equipment-validation.js.map