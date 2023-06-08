import { AppRoles } from './app-roles';
import { AppTicket } from 'src/app/shared/core/models/app-ticket';
import { Base } from './app-user';
import { AppUser } from 'src/app/shared/core/models/app-user';
import { Payment } from './app-ticket';
import { CalendarDatePipe } from 'angular-calendar/modules/common/calendar-date.pipe';

export class FinancialFilter {
  paymentStatus?: string;
  patient?: boolean;
  company?: boolean;
}

export interface PayerPayee {
  appUser: AppUser,
  payer: boolean
}

export class FinancialDebtFilter {
  patientId?: string;
  patientName?: string;
  companyId?: string;
  companyName?: string;
  startDate?: Date;
  endDate?: Date;
}

export class FinancialPaidFilter {
  patientId?: boolean;
  companyId?: boolean;
  startDate?: Date;
  endDate?: Date;
}

export class Debt {
  amount?: number;
  approvedPrice?: number;
  base?: Base;
  companyContract?: boolean;
  costType?: string;
  description?: string;
  patientContract?: boolean;
  payerPayee?: PayerPayee[];
  payment?: Payment[];
  paymentStatus?: string;
  ticket?: AppTicket
}

export class InvoiceCSV {
  Type?: string;
  Other?: string;
  Date?: string;
  Amount?: string;
  Paid?: string;
  Owing?: string;

  constructor(data: Debt)
  {
    this.Type = this.getType(data);
    this.Other = this.getOtherInformation(data);
    this.Date = new Date(data.base?.dateCreated ?? '').toISOString().slice(0, 10);
    this.Amount = data.amount?.toString() ?? '';
    const paid = this.getPaid(data);
    this.Paid = paid.toString();
    this.Owing = (data.amount ?? 0 - paid).toString();
  }

  getType(debt: Debt): string {
    if (debt.companyContract) { return 'Company Contract'; }
    if (debt.patientContract) { return 'Patient Contract'; }

    return debt.ticket?.appInventoryType ?? '';
  }

  getOtherInformation(debt: Debt): string {
    if (debt.companyContract) { return 'Company Contract'; }
    if (debt.patientContract) { return 'Patient Contract'; }

    const roles = AppRoles;

    switch (debt.ticket?.appInventoryType) {
      case roles.pharmacy:
        return this.getPharmacyOther(debt);

      default:
        return '';
    }
  }

  getPaid(debt: Debt): number
  {
    let sub = 0;
    debt.payment?.forEach(x => {
      sub += x.amount;
    });
    return sub;
  }

  private getPharmacyOther(debt: Debt): string {
    let data = '';

    debt.ticket?.ticketInventories.forEach(x => {
      data += `NAME: ${x.inventory.name} | AMOUNT: ${x.currentPrice} | QUANTITY: ${x.prescribedQuantity} \n************************************\n`
    });

    return `"${data}"`;
  }
}

export class AppPaid {
  amount?: number;
  approvedPrice?: number;
  base?: Base;
  costType?: string;
  description?: string;
  payerPayee?: PayerPayee[];
  payment?: Payment[];
  paymentStatus?: string;
  totalAppCosts?: number;
}
