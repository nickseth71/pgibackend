export interface EquipmentModel {
  name: string
  modelName: string
  procurementYear: string
  installationDate: Date
  status: string
  maintenanceType: string
  maintenanceExpiry?: Date
  inchargeName: string
  contactInfo: {
    phone?: string
    email?: string
  }
  createdAt: Date
  updatedAt: Date
}
