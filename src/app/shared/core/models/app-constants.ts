import { AppTicketTypes } from "./app-ticket";

export class AppConstants {
  // Envrionment variable from server
  public static readonly EnvironmentFromServer = {
    development : 'development',
    production: 'production',
    stagging: 'stagging'
  };

  public static readonly UserSections = {
    personalDetails : 'personalDetails',
    nextOfKin : 'nextOfKin',
    allergies : 'allergies',
    vitals : 'vitals',
    staffDetails : 'staffDetails',
    staffRoles : 'staffRoles',
    companyDetails : 'companyDetails',
    userFiles : 'userFiles',
    inventoryDetails: 'inventoryDetails',
    inventoryItems: 'inventoryItems',
    inventoryDependencies: 'inventoryDependencies',
    companyInventoryItems: 'companyInventoryItems',
    overallDescription: 'overallDescription',
    overallAppointmentDescription: 'overallAppointmentDescription',
    ticketDetail: 'ticketDetail',
    ticketList: 'ticketList',
    previousTicketList: 'previousTicketList',
    financeInventory: 'financeInventory',

    settingBilling: 'settingBilling',

    tickets: {
      pharmacy: `tickets:${AppTicketTypes.pharmacy}`,
      surgery: `tickets:${AppTicketTypes.surgery}`,
      lab: `tickets:${AppTicketTypes.lab}`,
      radiology: `tickets:${AppTicketTypes.radiology}`,
      admission: `tickets:${AppTicketTypes.admission}`,
    },
  }

  public static readonly LookUpType = {
    ContractTypeEnum: 'ContractTypeEnum',
    StaffRoleEnum: 'StaffRoleEnum',
    AppCostType: 'AppCostType',
    PaymentStatus: 'PaymentStatus',
    PaymentType: 'PaymentType',
    AppTicketStatus: 'AppTicketStatus',
    AppInventoryType: 'AppInventoryType',
    SurgeryTicketStatus: 'SurgeryTicketStatus'
  }
}


export interface ILookUp {
  name: string
  type: string
  display: string
}

