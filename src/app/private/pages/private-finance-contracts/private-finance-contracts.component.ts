import { CustomToastService } from './../../../shared/services/common/custom-toast/custom-toast.service';
import { AppCost } from './../../../shared/core/models/app-ticket';
import { FinancialService } from 'src/app/shared/services/api/financial/financial.service';
import { Component, OnInit } from '@angular/core';
import { faTicket, faEllipsisV, faSignature } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { AppTicket, TicketFilter } from 'src/app/shared/core/models/app-ticket';
import { AppPagination, PaginationRequest, PaginationResponse } from 'src/app/shared/core/models/pagination';
import { ApplicationRoutes } from 'src/app/shared/core/routes/app-routes';
import { TicketService } from 'src/app/shared/services/api/ticket/ticket.service';
import { FinancialFilter } from 'src/app/shared/core/models/financial';
import { finalize } from 'rxjs';
import { PrivateAddPaymentModalComponent } from '../../modals/private-add-payment-modal/private-add-payment-modal.component';
import { FileUpload } from '../../modals/private-upload-files-modal/private-upload-files-modal.component';
import { PrivateFilterFinanceContractModalComponent } from '../../modals/private-filter-finance-contract-modal/private-filter-finance-contract-modal.component';
import { PaymentMade } from 'src/app/shared/core/models/payment-made-model';

@Component({
  selector: 'app-private-finance-contracts',
  templateUrl: './private-finance-contracts.component.html',
  styleUrls: ['./private-finance-contracts.component.scss']
})
export class PrivateFinanceContractsComponent extends SharedUtilityComponent implements OnInit {

  fonts = { faTicket, faEllipsisV, faSignature }

  routes = ApplicationRoutes.generateRoutes();

  contracts: AppCost[] = [];
  appPagination = new AppPagination();
  filter = new FinancialFilter();
  paginationRequest = new PaginationRequest<FinancialFilter>(this.appPagination, this.filter);
  paginationResponse = new PaginationResponse<AppCost[]>();

  constructor(
    private financialService: FinancialService,
    private modalService: NgbModal,
    private toast: CustomToastService,
  ) {
    super();
  }

  override ngOnInit(): void {
    this.filter.paymentStatus = 'owing';
    this.filter.patient = true;
    this.paginationRequest = new PaginationRequest<FinancialFilter>(this.appPagination, this.filter);
    this.getContracts();
  }

  getContracts(): void {
    this.isLoading = true;
    const sub = this.financialService.getContracts(this.paginationRequest)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {
          this.paginationResponse = data;
          this.contracts = data.result ?? [];
        },
        error: (error) => {
          throw error;
        }
      });
    this.subscriptions.push(sub);
  }

  pageChanged(e: number) {
    this.appPagination.pageNumber = e;
    this.paginationRequest = new PaginationRequest<FinancialFilter>(this.appPagination, this.filter);
    this.getContracts();
  }

  openFilterTicketModal(): void {
    const modalRef = this.modalService.open(PrivateFilterFinanceContractModalComponent, { size: 'lg' });
    modalRef.componentInstance.filter = this.filter;

    const sub = modalRef.componentInstance.newFilter.subscribe({
      next: (filter: FinancialFilter) => {
        this.filter = filter;
        this.paginationRequest = new PaginationRequest<FinancialFilter>(this.appPagination, this.filter);
        this.getContracts();
      }
    });
    this.subscriptions.push(sub);

  }

  addPayment(appCost: AppCost): void {
    const modalRef = this.modalService.open(PrivateAddPaymentModalComponent, { size: 'lg' });
    modalRef.componentInstance.cost = appCost.approvedPrice;

    const sub = modalRef.componentInstance.newPayment.subscribe({
      next: (data: PaymentMade) => {
        this.updateContract(data, appCost);
      },
      error: (error: any) => {
        throw error;
      }
    });

    this.subscriptions.push(sub);
  }

  private updateContract(payment: PaymentMade, appCost: AppCost): void {
    const data = {
      appCostId: appCost.base.id,
      name: payment.name,
      base64String: payment.base64String,
      amount: payment.amount,
      paymentType: payment.paymentType
    };
    this.isLoading = true;
    const sub = this.financialService.updateContract(data)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {
          this.toast.success('Contract updated successfully');
          this.getContracts();
        },
        error: (error) => {
          throw error;
        }
      });

    this.subscriptions.push(sub);
  }

}
