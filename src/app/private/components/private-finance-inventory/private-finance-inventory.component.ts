import { UserFile } from './../../../shared/core/models/files';
import { AppFileService } from 'src/app/shared/services/common/app-file/app-file.service';
import { finalize } from 'rxjs';
import { FinancialService } from 'src/app/shared/services/api/financial/financial.service';
import { Payment } from './../../../shared/core/models/app-ticket';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppTicket } from 'src/app/shared/core/models/app-ticket';
import { faFileAlt, faTrashAlt, faDownload, faTrash } from '@fortawesome/free-solid-svg-icons';
import * as saveAs from 'file-saver';
import { UtilityHelpers } from 'src/app/shared/core/functions/utility-helpers';
import { FileUpload } from '../../modals/private-upload-files-modal/private-upload-files-modal.component';
import { PaymentMade } from 'src/app/shared/core/models/payment-made-model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PrivateAddPaymentModalComponent } from '../../modals/private-add-payment-modal/private-add-payment-modal.component';
import { ApplicationRoutes } from 'src/app/shared/core/routes/app-routes';
import { AppConstants } from 'src/app/shared/core/models/app-constants';
import { CustomToastService } from 'src/app/shared/services/common/custom-toast/custom-toast.service';
import { AppUser } from 'src/app/shared/core/models/app-user';

@Component({
  selector: 'app-private-finance-inventory',
  templateUrl: './private-finance-inventory.component.html',
  styleUrls: ['./private-finance-inventory.component.scss']
})
export class PrivateFinanceInventoryComponent extends SharedUtilityComponent implements OnInit {

  @Input() ticket: AppTicket = {} as AppTicket;
  @Output() reload = new EventEmitter<string>();

  fonts = { faFileAlt, faTrashAlt, faDownload, faTrash }

  payments: PaymentMade[] = [];
  currentSum = 0;
  currentOwing = 0;
  paying = 0;
  payer?: AppUser;

  routes = ApplicationRoutes.generateRoutes();
  userSections = AppConstants.UserSections;

  constructor(
    private modalService: NgbModal,
    private financialService: FinancialService,
    private toast: CustomToastService,
    private fileService: AppFileService
    ) {
    super();
  }

  override ngOnInit(): void {
    this.getPayer();
    this.calculatePaid();
    this.calculatePaying();
  }

  getPayer(): void {
    this.payer = this.ticket.payerPayee.find(x => x.payer)?.appUser;
  }

  downloadFile(base64string?: string, name: string = 'proof_of_payment.jpeg'): void {
    this.fileService.download({ base64String: base64string, name } as UserFile)
  }

  removeFromList(index: any): void {
    this.payments.splice(index, 1);
    this.calculatePaying();
  }

  addPayment(): void {
    const modalRef = this.modalService.open(PrivateAddPaymentModalComponent, { size: 'lg' });
    modalRef.componentInstance.cost = this.currentOwing;

    const sub = modalRef.componentInstance.newPayment.subscribe({
      next: (data: FileUpload) => {
        this.payments.push(data);
        this.calculatePaying();
      },
      error: (error: any) => {
        throw error;
      }
    });

    this.subscriptions.push(sub);
  }

  calculatePaid(): void {
    this.ticket.cost.payment.forEach(x => {
      this.currentSum += x.amount;
    });

    this.currentOwing = this.ticket.cost.approvedPrice - this.currentSum;
  }

  calculatePaying(): void {
    this.paying = 0;
    this.payments.forEach(x => {
      this.paying += x.amount ?? 0
    });
  }

  updatePayment(): void {
    const data = {
      appTicketId: this.ticket.base.id,
      payments: this.payments
    };

    this.isLoading = true;
    const sub = this.financialService.updatePatientPayment(data)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: () => {
          this.toast.success('Update made successfully');
          this.reload.emit(this.userSections.financeInventory);
        },
        error: (error) => {
          throw error;
        }
      });

    this.subscriptions.push(sub);
  }

}
