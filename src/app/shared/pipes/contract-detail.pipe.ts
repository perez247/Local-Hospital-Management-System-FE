import { UserContract } from 'src/app/shared/core/models/app-user';
import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'contractDetail'
})
export class ContractDetailPipe implements PipeTransform {

  transform(value?: UserContract, ...args: unknown[]): string {

    if (!value) {
      return 'No contract available';
    }

    if (!value.appCost) {
      return 'Contract pending approval';
    }

    if (value.appCost.patientContract && value.appCost.paymentStatus == 'owing') {
      return 'Contract pending approval';
    }

    if (value.appCost.paymentStatus == 'pending') {
      return 'Contract pending approval';
    }

    const startDate = moment(value.startDate);
    const endDate = moment(startDate).add(value.duration, 'days');

    const daysRemaining = endDate?.diff(startDate, 'days') ?? 0;

    if (daysRemaining <= 0) {
      return 'Contract has expired';
    }

    return `${startDate.format('MMM DD, YY')} - ${endDate.format('MMM DD, YY')}`;
  }

}
