import { IRoutePath } from '../app-routes';


export class AppPrivateRoute {

    /**
     * @description The initial/default aboslute url for users when they visit the application
     */
    public static $absolutePath = `private`;

    /**
     * @description The name of the url for registering in routing module
     */
    public static $name = `private`;

    /**
     * @description Welcome site to show users
     */
    public static welcome(): IRoutePath {
        return {
            $name: `welcome`,
            $absolutePath: `${AppPrivateRoute.$absolutePath}/welcome`
        };
    }

     /**
     * @description Dashboard
     */
        public static dashoard(): IRoutePath {
          return {
              $name: `dashboard`,
              $absolutePath: `${AppPrivateRoute.$absolutePath}/dashboard`
          };
      }

     /**
     * @description Patients
     */
     public static patients(): IRoutePath {
      return {
          $name: `patients`,
          $absolutePath: `${AppPrivateRoute.$absolutePath}/patients`
      };
    }

     /**
     * @description Single Patient
     */
     public static single_patient(id: string = ':id'): IRoutePath {
      return {
          $name: `patients/${id}`,
          $absolutePath: `${AppPrivateRoute.$absolutePath}/patients/${id}`
      };
    }

     /**
     * @description Staff
     */
     public static staff(): IRoutePath {
      return {
          $name: `staff`,
          $absolutePath: `${AppPrivateRoute.$absolutePath}/staff`
      };

    }

     /**
     * @description Single staff
     */
     public static single_staff(id: string = ':id'): IRoutePath {
      return {
          $name: `staff/${id}`,
          $absolutePath: `${AppPrivateRoute.$absolutePath}/staff/${id}`
      };
    }

     /**
     * @description Companies
     */
     public static companies(): IRoutePath {
      return {
          $name: `companies`,
          $absolutePath: `${AppPrivateRoute.$absolutePath}/companies`
      };
    }
         /**
     * @description Single companies
     */
         public static single_company(id: string = ':id'): IRoutePath {
          return {
              $name: `companies/${id}`,
              $absolutePath: `${AppPrivateRoute.$absolutePath}/companies/${id}`
          };
        }

     /**
     * @description Inventories
     */
         public static inventories(): IRoutePath {
          return {
              $name: `inventories`,
              $absolutePath: `${AppPrivateRoute.$absolutePath}/inventories`
          };
    }

    /**
     * @description Single inventory
     */
        public static single_inventory(id: string = ':id'): IRoutePath {
        return {
            $name: `inventories/${id}`,
            $absolutePath: `${AppPrivateRoute.$absolutePath}/inventories/${id}`
        };
      }

     /**
     * @description Appointments
     */
     public static appointments(): IRoutePath {
      return {
          $name: `appointments`,
          $absolutePath: `${AppPrivateRoute.$absolutePath}/appointments`
      };
    }

    /**
     * @description Single appointment
     */
    public static single_appointment(id: string = ':id'): IRoutePath {
      return {
          $name: `appointments/${id}`,
          $absolutePath: `${AppPrivateRoute.$absolutePath}/appointments/${id}`
      };
    }

     /**
     * @description Tickets
     */
     public static tickets(): IRoutePath {
      return {
          $name: `tickets`,
          $absolutePath: `${AppPrivateRoute.$absolutePath}/tickets`
      };
    }

    /**
     * @description Single ticket
     */
    public static single_ticket(id: string = ':id'): IRoutePath {
      return {
          $name: `tickets/${id}`,
          $absolutePath: `${AppPrivateRoute.$absolutePath}/tickets/${id}`
      };
    }

    /**
     * @description Finance
     */
     public static finance(): IRoutePath {
      return {
          $name: `finance`,
          $absolutePath: `${AppPrivateRoute.$absolutePath}/finance`
      };
    }

    /**
     * @description Finance contracts with individuals or company
     */
    public static financeContracts(): IRoutePath {
      return {
          $name: `finance-contracts`,
          $absolutePath: `${AppPrivateRoute.$absolutePath}/finance-contracts`
      };
    }

    /**
     * @description Finance tickets
     */
    public static Single_financeTickets(id: string = ':id'): IRoutePath {
      return {
          $name: `finance-tickets/${id}`,
          $absolutePath: `${AppPrivateRoute.$absolutePath}/finance-tickets/${id}`
      };
    }

    /**
     * @description Finance tickets
     */
    public static financeTickets(): IRoutePath {
      return {
          $name: `finance-tickets`,
          $absolutePath: `${AppPrivateRoute.$absolutePath}/finance-tickets`
      };
    }

    /**
     * @description Single Finance Debts
     */
    public static single_financeDebt(id: string = ':id'): IRoutePath {
      return {
          $name: `finance-debts/${id}`,
          $absolutePath: `${AppPrivateRoute.$absolutePath}/finance-debts/${id}`
      };
    }

    /**
     * @description Finance tickets
     */
    public static financeDebts(): IRoutePath {
      return {
          $name: `finance-debts`,
          $absolutePath: `${AppPrivateRoute.$absolutePath}/finance-debts`
      };
    }

    /**
     * @description Single Finance paid
     */
    public static single_financePaid(id: string = ':id'): IRoutePath {
      return {
          $name: `finance-paid/${id}`,
          $absolutePath: `${AppPrivateRoute.$absolutePath}/finance-paid/${id}`
      };
    }

    /**
     * @description Finance paid
     */
    public static financePaid(): IRoutePath {
      return {
          $name: `finance-paid`,
          $absolutePath: `${AppPrivateRoute.$absolutePath}/finance-paid`
      };
    }

    /**
     * @description Settings
     */
    public static settings(): IRoutePath {
      return {
          $name: `settings`,
          $absolutePath: `${AppPrivateRoute.$absolutePath}/settings`
      };
    }

    /**
     * @description Not found in private
     */
         public static notfound(error?: string): IRoutePath {
          return {
              $name: `notfound/${error}`,
              $absolutePath: `${AppPrivateRoute.$absolutePath}/notfound/${error}`
          };
        }

    public static getRoutes(): IAppPrivateRoute {
      return {
        $absolutePath: AppPrivateRoute.$absolutePath,
        $name: AppPrivateRoute.$name,
        welcome: AppPrivateRoute.welcome,
        dashboard: AppPrivateRoute.dashoard,
        patients: AppPrivateRoute.patients,
        staff: AppPrivateRoute.staff,
        companies: AppPrivateRoute.companies,
        inventories: AppPrivateRoute.inventories,
        appointments: AppPrivateRoute.appointments,
        tickets: AppPrivateRoute.tickets,
        finance: AppPrivateRoute.finance,
        finance_tickets: AppPrivateRoute.financeTickets,
        finance_contracts: AppPrivateRoute.financeContracts,
        finance_debts: AppPrivateRoute.financeDebts,
        finance_paid: AppPrivateRoute.financePaid,
        single_patient: AppPrivateRoute.single_patient,
        single_staff: AppPrivateRoute.single_staff,
        single_company: AppPrivateRoute.single_company,
        single_inventory: AppPrivateRoute.single_inventory,
        single_appointment: AppPrivateRoute.single_appointment,
        single_ticket: AppPrivateRoute.single_ticket,
        Single_finance_tickets: AppPrivateRoute.Single_financeTickets,
        single_finance_debt: AppPrivateRoute.single_financeDebt,
        single_finance_paid: AppPrivateRoute.single_financePaid,
        settings: AppPrivateRoute.settings,
        notfound: AppPrivateRoute.notfound,
      };
    }
}

export interface IAppPrivateRoute {
  $absolutePath: string;
  $name: string;
  welcome: () => IRoutePath;
  dashboard: () => IRoutePath;
  patients: () => IRoutePath;
  staff: () => IRoutePath;
  companies: () => IRoutePath;
  inventories: () => IRoutePath;
  appointments: () => IRoutePath;
  tickets: () => IRoutePath;
  finance: () => IRoutePath;
  finance_tickets: () => IRoutePath;
  finance_contracts: () => IRoutePath;
  finance_debts: () => IRoutePath;
  finance_paid: () => IRoutePath;
  settings: () => IRoutePath;
  single_patient: (id?: string) => IRoutePath;
  single_staff: (id?: string) => IRoutePath;
  single_company: (id?: string) => IRoutePath;
  single_inventory: (id?: string) => IRoutePath;
  single_appointment: (id?: string) => IRoutePath;
  single_ticket: (id?: string) => IRoutePath;
  Single_finance_tickets: (id?: string) => IRoutePath;
  single_finance_debt: (id?: string) => IRoutePath;
  single_finance_paid: (id?: string) => IRoutePath;
  notfound: (error?: string) => IRoutePath;
}

