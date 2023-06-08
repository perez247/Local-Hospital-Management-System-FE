import { CustomToastService } from './../../../shared/services/common/custom-toast/custom-toast.service';
import { FinancialDebtFilter } from 'src/app/shared/core/models/financial';
import { AppFileService } from 'src/app/shared/services/common/app-file/app-file.service';
import { SharedUtilityComponent } from './../../../shared/components/shared-utility/shared-utility.component';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApplicationRoutes } from 'src/app/shared/core/routes/app-routes';
import { PrivateAddPaymentModalComponent } from '../private-add-payment-modal/private-add-payment-modal.component';
import { FileUpload } from '../private-upload-files-modal/private-upload-files-modal.component';
import { PaymentMade } from 'src/app/shared/core/models/payment-made-model';
import { UserFile } from 'src/app/shared/core/models/files';
import { faFileAlt, faTrashAlt, faDownload, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FinancialService } from 'src/app/shared/services/api/financial/financial.service';
import { finalize } from 'rxjs';
import { IConfirmAction, SharedConfirmActionModalComponent } from 'src/app/shared/modals/shared-confirm-action-modal/shared-confirm-action-modal.component';

@Component({
  selector: 'app-private-debt-payment-modals',
  templateUrl: './private-debt-payment-modals.component.html',
  styleUrls: ['./private-debt-payment-modals.component.scss']
})
export class PrivateDebtPaymentModalsComponent extends SharedUtilityComponent implements OnInit {

  @Input() debt = 0;
  @Input() paid = 0;

  @Input() filter?: FinancialDebtFilter;

  @Output() newPayment = new EventEmitter<PaymentMade>();

  name = '';
  isPatient = true;
  userId = '';

  routes = ApplicationRoutes.generateRoutes();

  payment?: PaymentMade;

  fonts = { faFileAlt, faTrashAlt, faDownload, faTrash }

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private fileService: AppFileService,
    private toast: CustomToastService,
    private financialService: FinancialService,
  ) {
    super();
  }

  override ngOnInit(): void {
    this.setData();
  }

  setData(): void {
    this.userId = this.filter?.patientId ? this.filter.patientId : this.filter?.companyId ?? '';
    this.isPatient = this.filter?.patientId ? true : false;
    this.name = this.filter?.patientId ? this.filter.patientName ?? '' : this.filter?.companyName ?? '';
  }


  addPayment(): void {
    const modalRef = this.modalService.open(PrivateAddPaymentModalComponent, { size: 'lg' });
    modalRef.componentInstance.cost = this.debt - this.paid;

    const sub = modalRef.componentInstance.newPayment.subscribe({
      next: (data: PaymentMade) => {
        this.payment = data;
      },
      error: (error: any) => {
        throw error;
      }
    });

    this.subscriptions.push(sub);
  }

  downloadFile(base64string?: string, name: string = 'proof_of_payment.jpeg'): void {
    this.fileService.download({ base64String: base64string, name } as UserFile)
  }

  removeFromList(): void {
    this.payment = undefined;
  }

  confirmPayment(): void {
    const modalRef = this.modalService.open(SharedConfirmActionModalComponent);
    const confirmData = {
      title: `Confirm payment`,
      body: `Are you sure you want to add this payment?. ${this.paid + (this.payment?.amount ?? 0)} is less than ${this.debt}`,
      positiveBtn: `Yes, Add`,
      positiveBtnCss: `btn btn-primary`,
      nagativeBtn: `No, Cancel`,
      negativeBtnCss: `btn btn-danger`
    } as IConfirmAction;

    modalRef.componentInstance.confirmData = confirmData;
    const sub = modalRef.componentInstance.actionTaken.subscribe({
      next: (takeAction: boolean) => {
        if(takeAction) {
          this.begin();
        }
      }
    });
    this.subscriptions.push(sub)
  }

  paydebt(): void {

    if (this.paid + (this.payment?.amount ?? 0) > this.debt) {
      this.toast.error('Sum total of what to pay exceeds what is owed');
      return;
    }

    if (this.paid + (this.payment?.amount ?? 0) < this.debt) {
      this.confirmPayment();
      return;
    }

    this.begin();
  }

  private begin(): void {

    const data = {
      userId: this.userId,
      isPatient: this.isPatient,
      amountToPay: this.payment?.amount,
      startDate: this.filter?.startDate,
      endDate: this.filter?.endDate,
      proof: this.payment?.base64String,
      paymentType: this.payment?.paymentType
    }

    this.isLoading = true;
    const sub = this.financialService.payDebt(data)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {
          this.toast.success('Payments updated successfully');
          this.newPayment.emit();
          this.activeModal.close();
        },
        error: (error) => {
          throw error;
        }
      });

    this.subscriptions.push(sub);
  }
}
