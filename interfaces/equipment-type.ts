export interface EquipmentModel {
  id: string
  equipmentName: string
  modelName: string
  procurementYear: string
  installationDate: string
  status: string
  maintenanceType: string
  maintenanceExpiry?: string
  inchargeName: string
  contactInfo: {
    name?: string
    phone?: string
    email?: string
  }
  createdAt: string
  updatedAt: string | null
}
