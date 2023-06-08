import { Payment } from './../core/models/app-ticket';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paidDebt'
})
export class PaidDebtPipe implements PipeTransform {

  transform(value: any, ...args: any[]): number {

    const payment: Payment[] = value || [];

    let paid = 0;

    payment.forEach((x) => {
      paid += x.amount;
    });

    const debt = args[0] || 0;

    if (debt === 0) {
      return paid;
    } else {
      return debt - paid;
    }
  }

}
