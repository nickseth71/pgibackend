import ErrorResponse from "../utils/error-response.js";
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    let error = { ...err };
    error.message = err.message;
    if (err.name === "CastError") {
        const message = `Resource not found with id of ${err.value}`;
        error = new ErrorResponse(message, 404);
    }
    if (err.code === 11000) {
        const keyValue = err.keyValue;
        const duplicateField = keyValue ? Object.keys(keyValue)[0] : "";
        const duplicateValue = keyValue ? keyValue[duplicateField] : "";
        const message = duplicateField && duplicateValue
            ? `Duplicate value for ${duplicateField}: ${duplicateValue}`
            : "Duplicate field value entered";
        error = new ErrorResponse(message, 400);
    }
    if (err.name === "ValidationError") {
        const messages = Object.values(err.errors).map((val) => val.message);
        const message = messages.join("/n");
        error = new ErrorResponse(message, 400);
    }
    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || "Server Error",
    });
};
export default errorHandler;
//# sourceMappingURL=error-handler.js.map