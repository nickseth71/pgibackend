import { Router } from "express";
import EquipmentController from "../controllers/equipment-controller.ts";
import { protect, authorize } from "../middlewares/auth-middleware.ts";
import validate from "../middlewares/validate.ts";
import { equipmentValidation } from "../validations/equipment-validation.ts";
const router = Router();
router.use(protect);
router
    .route("/")
    .post(authorize("admin", "technician"), validate(equipmentValidation.createEquipment), EquipmentController.createEquipment)
    .get(EquipmentController.getAllEquipment);
router
    .route("/:id")
    .get(EquipmentController.getEquipment)
    .put(authorize("admin", "technician"), validate(equipmentValidation.updateEquipment), EquipmentController.updateEquipment)
    .delete(authorize("admin"), EquipmentController.deleteEquipment);
router.route("/status/:status").get(EquipmentController.getEquipmentByStatus);
router
    .route("/maintenance/due")
    .get(authorize("admin", "technician"), EquipmentController.getEquipmentDueForMaintenance);
export default router;
//# sourceMappingURL=equipment-routes.js.map