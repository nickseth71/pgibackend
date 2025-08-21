import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "PGI Equipment Management API",
            version: "1.0.0",
            description: "API for managing hospital equipment",
        },
        servers: [
            {
                url: "http://localhost:3000/api/v1",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
            schemas: {
                Equipment: {
                    type: "object",
                    properties: {
                        name: { type: "string", example: "C-Arm Fluoroscopy" },
                        modelName: { type: "string", example: "Allengers" },
                        procurementYear: { type: "string", example: "2005-2006" },
                        installationDate: {
                            type: "string",
                            format: "date",
                            example: "2005-07-05",
                        },
                        status: {
                            type: "string",
                            enum: [
                                "Functional",
                                "Non-Functional",
                                "Partially Functional",
                                "Under Maintenance",
                            ],
                            example: "Partially Functional",
                        },
                        maintenanceType: {
                            type: "string",
                            enum: ["CMC", "AMC", "None"],
                            example: "CMC",
                        },
                        maintenanceExpiry: {
                            type: "string",
                            format: "date",
                            example: "2025-03-31",
                        },
                        inchargeName: { type: "string", example: "Dr. John Doe" },
                        contactInfo: {
                            type: "object",
                            properties: {
                                phone: { type: "string", example: "+911234567890" },
                                email: {
                                    type: "string",
                                    format: "email",
                                    example: "incharge@example.com",
                                },
                            },
                        },
                    },
                },
                User: {
                    type: "object",
                    properties: {
                        name: { type: "string", example: "John Doe" },
                        email: {
                            type: "string",
                            format: "email",
                            example: "john@example.com",
                        },
                        role: {
                            type: "string",
                            enum: ["admin", "user", "technician"],
                            example: "technician",
                        },
                    },
                },
            },
        },
    },
    apis: ["../routes/*.ts", "../controllers/*.ts", "../models/*.ts"],
};
const specs = swaggerJsdoc(options);
export const setupSwagger = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};
//# sourceMappingURL=swagger.js.map