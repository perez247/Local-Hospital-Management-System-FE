import { AppCost } from "./app-ticket"

export class AppUser {

    constructor(data: Partial<AppUser>)
    {
      Object.assign(this, data);
    }

    nextOfKin: any
    userRoles?: string[]
    firstName?: string
    lastName?: string
    otherName?: string
    phone: any
    address?: string
    base?: Base
    staff?: Staff
    patient?: Patient
    company?: Company
    profile?: string;
    email?: string;
    isPatient?: boolean;
    isCompany?: boolean;

    hasRole(roles: string[] = [], and: boolean): boolean {

      if (roles.length <= 0) { return false }

      let hasRole: boolean[] = [];
      roles.forEach(x => {
        var role = this.userRoles?.find(a => a === x);
        if (role) {
          hasRole.push(true);
        } else {
          hasRole.push(false);
        }
      });

      if (and) {
        return hasRole.every(Boolean);
      } else {
        return hasRole.some(Boolean);
      }
    }
  }

  export class Staff {
    level?: string
    contractStaff?: string
    salary?: number
    position?: string
    active?: boolean
    lastSavingPaymentDate?: string
    nextSavingPaymentDate?: string
    userId?: string
    base?: Base
    lastSalaryPayment?: any
    accountNumber?: string
    bankName?: string
    bankId?: string
    user?: AppUser
  }

  export class Patient {
    company?: Company
    allergies?: string
    user?: AppUser
    patientContract?: UserContract
    base?: Base
  }

  export class UserContract {
    appCost?: AppCost
    startDate?: string
    duration?: number
    patient?: Patient
    company?: Company
  }

  export class Company {
    description?: string
    uniqueId?: string
    otherId?: string
    userId?: string
    name?: string
    user?: AppUser
    companyContract?: UserContract
    base?: Base
    forIndividual?: boolean
    homeCompany?: boolean
  }

  export class NextOfKin {
    userId?: string
    firstName?: string
    lastName?: string
    otherName?: string
    phone1?: string
    phone2?: string
    email?: string
    address?: string
    base?: Base
    profile?: string
  }

  export interface Base {
    id: string
    dateCreated: string
    dateModified: string
  }

  export class UserFilter {

    constructor(userType: 'staff' | 'patient' | 'company' | 'all') {
      this.userType = userType;
    }

    name?: string;
    patientId?: string;
    staffId?: string;
    companyId?: string;
    userId?: string;
    userSearchId?: string;
    isCompany?: boolean;
    active?: boolean;
    userType?: string;
    roles?: string[];

    patientCompanyName?: string;
    patientCompanyId?: string;
    forIndividual?: boolean;
  }

  export class Nurse {
    user?: AppUser
    level?: string
    contractStaff?: string
    salary?: number
    position?: string
    active?: boolean
    accountNumber?: string
    bankName?: string
    bankId?: string
  }
