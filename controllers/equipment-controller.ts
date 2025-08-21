import type { Request, Response } from "express"
import EquipmentService from "../services/equipment-service.js"
import type { PaginationOptions } from "../interfaces/pagination.js"
import httpStatus from "http-status"
import ErrorResponse from "../utils/error-response.js"
import asyncHandler from "../middlewares/async-handler.js"

class EquipmentController {
  createEquipment = asyncHandler(async (req: Request, res: Response) => {
    const equipment = await EquipmentService.createEquipment(req.body)
    res.status(httpStatus.CREATED).json(equipment)
  })

  getEquipment = asyncHandler(async (req: Request, res: Response) => {
    const equipment = await EquipmentService.getEquipmentById(req.params.id)
    if (!equipment) {
      throw new ErrorResponse("Equipment not found", httpStatus.NOT_FOUND)
    }
    res.status(httpStatus.OK).json(equipment)
  })

  getAllEquipment = asyncHandler(async (req: Request, res: Response) => {
    const { page = 1, limit = 10, sort = "-createdAt", ...filter } = req.query
    const paginationOptions: PaginationOptions = {
      page: parseInt(page as string),
      limit: parseInt(limit as string),
      sort: sort as string,
    }

    const { data, total } = await EquipmentService.getAllEquipment(
      filter,
      paginationOptions
    )

    res.status(httpStatus.OK).json({
      data,
      pagination: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
        total,
        pages: Math.ceil(total / (paginationOptions?.limit || 10)),
      },
    })
  })

  updateEquipment = asyncHandler(async (req: Request, res: Response) => {
    const equipment = await EquipmentService.updateEquipment(
      req.params.id,
      req.body
    )
    if (!equipment) {
      throw new ErrorResponse("Equipment not found", httpStatus.NOT_FOUND)
    }
    res.status(httpStatus.OK).json(equipment)
  })

  deleteEquipment = asyncHandler(async (req: Request, res: Response) => {
    const equipment = await EquipmentService.deleteEquipment(req.params.id)
    if (!equipment) {
      throw new ErrorResponse("Equipment not found", httpStatus.NOT_FOUND)
    }
    res
      .status(httpStatus.OK)
      .json({ message: "Equipment deleted successfully" })
  })

  getEquipmentByStatus = asyncHandler(async (req: Request, res: Response) => {
    const equipment = await EquipmentService.getEquipmentByStatus(
      req.params.status
    )
    res.status(httpStatus.OK).json(equipment)
  })

  getEquipmentDueForMaintenance = asyncHandler(
    async (req: Request, res: Response) => {
      const equipment = await EquipmentService.getEquipmentDueForMaintenance()
      res.status(httpStatus.OK).json(equipment)
    }
  )
}

export default new EquipmentController()
