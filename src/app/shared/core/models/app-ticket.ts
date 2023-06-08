import { PayerPayee } from './financial';
import { Company } from 'src/app/shared/core/models/app-user';
import { AppUser, Base, Patient, Staff, UserContract } from "./app-user";
import { AppInventory } from "./inventory";

export class TicketFilter {
  appointmentId?: string;
  appInventoryType?: string;
  patientId?: string;
  patientName?: string;
  doctorId?: string;
  doctorName?: string;
  ticketId?: string;
  full?: boolean;
  sentToDepartment?: boolean;
  sentToFinance?: boolean;
  appTicketStatus?: string;
  paymentStatus?: string[];
  beforeDateTime?: string;
}

export interface AppTicket {
  base: Base
  appointmentId: string
  cost: AppCost
  overallDescription: string
  overallAppointmentDescription: string
  sent: boolean
  sentToFinance: boolean
  appTicketStatus: string
  appInventoryType: string
  ticketInventories: TicketInventory[]
  doctor: Staff
  patient: Patient
  payerPayee: PayerPayee[]
}

export const AppTicketTypes = {
  pharmacy: 'pharmacy',
  surgery: 'surgery',
  lab: 'lab',
  radiology: 'radiology',
  admission: 'admission'
}

export interface TicketInventory {
  appTicketId: string
  inventory: AppInventory
  appInventoryQuantity: number
  currentPrice: any
  totalPrice: any
  concludedDate: any
  appTicketStatus: string
  proof: string[]
  description: any
  staffPrescription?: string
  doctorsPrescription?: string
  departmentDescription?: string
  financeDescription?: string
  prescribedQuantity?: number
  surgeryDate?: string
  surgeryTicketStatus: string
  surgeryTicketPersonnels: SurgeryTicketPersonnel[]
  prescribedSurgeryDescription?: string
  prescribedLabRadiologyFeature?: string
  dateOfLabTest?: string
  labRadiologyTestResult: any
  prescribedAdmission?: string
  admissionStartDate?: string
  admissionEndDate: any
  base: Base
  pricePerItem: number
  itemsUsed: AppInventory[]
}

export interface SurgeryTicketPersonnel {
  base: Base
  personnel: AppUser
  surgeryRole: string
  description: string
  summaryOfSurgery: any
  isHeadPersonnel?: boolean
  isPatient?: boolean
}

export interface Payment {
  amount: number
  tax: number
  paymentType: string
  proof: string
  paymentDetails: any
  additionalDetail: any
  datePaid: Date
}

export interface AppCost {
  amount: number
  approvedPrice: number
  description: any
  payment: Payment[]
  costType: string
  paymentStatus: string
  patientContractObj: UserContract,
  companyContractObj: UserContract
  patientContract: boolean,
  companyContract: boolean
  base: Base
}

export interface ITicketInventory {
  doctorsPrescription: string,
  inventoryId: string,
  inventoryName: string,
}

