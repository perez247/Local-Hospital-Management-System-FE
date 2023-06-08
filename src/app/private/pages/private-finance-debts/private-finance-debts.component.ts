import { UserIdPipe } from './../../../shared/pipes/user-id.pipe';
import { AppFileService } from 'src/app/shared/services/common/app-file/app-file.service';
import { finalize } from 'rxjs';
import { FinancialService } from 'src/app/shared/services/api/financial/financial.service';
import { Debt, FinancialDebtFilter, InvoiceCSV } from './../../../shared/core/models/financial';
import { Component, OnInit } from '@angular/core';
import { faSackXmark } from '@fortawesome/free-solid-svg-icons';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { AppPagination, PaginationRequest, PaginationResponse } from 'src/app/shared/core/models/pagination';
import { ApplicationRoutes } from 'src/app/shared/core/routes/app-routes';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PrivateFilterFinanceDebtsModalComponent } from '../../modals/private-filter-finance-debts-modal/private-filter-finance-debts-modal.component';
import { PrivateDebtPaymentModalsComponent } from '../../modals/private-debt-payment-modals/private-debt-payment-modals.component';

@Component({
  selector: 'app-private-finance-debts',
  templateUrl: './private-finance-debts.component.html',
  styleUrls: ['./private-finance-debts.component.scss']
})
export class PrivateFinanceDebtsComponent extends SharedUtilityComponent implements OnInit {

  fonts = { faSackXmark }

  routes = ApplicationRoutes.generateRoutes();

  debts: Debt[] = [];
  appPagination = new AppPagination();
  filter = new FinancialDebtFilter();
  paginationRequest = new PaginationRequest<FinancialDebtFilter>(this.appPagination, this.filter);
  paginationResponse = new PaginationResponse<Debt[]>();

  debt = 0;
  paid = 0;

  invoiceData: Debt[] = [];

  constructor(
    private modalService: NgbModal,
    private financialService: FinancialService,
    private fileService: AppFileService,
    ) {
    super();
  }

  override ngOnInit(): void {
    this.getDebts();
  }

  getDebts(): void {
    this.isLoading = true;
    const sub = this.financialService.debts(this.paginationRequest)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {
          this.debt = data.result.debt;
          this.paid = data.result.paid;
          this.paginationResponse = data;
          this.debts = data.result.result ?? [];
        },
        error: (error) => {
          throw error;
        }
      });

    this.subscriptions.push(sub);
  }

  downloadInvoice(pageNumber: number = 1): void {
    const appPagination = new AppPagination();
    appPagination.pageSize = 500;
    appPagination.pageNumber = pageNumber;
    const paginationRequest = new PaginationRequest<FinancialDebtFilter>(this.appPagination, this.filter);
    this.isLoading = true;
    const sub = this.financialService.debts(paginationRequest)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {

          this.invoiceData = this.invoiceData.concat(data.result.result ?? []);

          if (this.invoiceData.length < data.totalItems) {
            this.downloadInvoice(pageNumber++);
          } else {
            this.downloadInvoiceAsCSV(this.invoiceData);
            this.invoiceData = [];
          }
        },
        error: (error) => {
          throw error;
        }
      });

    this.subscriptions.push(sub);
  }

  private downloadInvoiceAsCSV(debts: Debt[] = []): void {
    const invoice = debts.map(x => new InvoiceCSV(x));
    let name = this.filter.patientId ? this.filter.patientName : this.filter.companyName;
    const id = this.filter.patientId ? this.filter.patientId : this.filter.companyId;
    name = `Invoice_${name?.replace(' ', '_')}_${new UserIdPipe().transform(id)}_${new Date().toLocaleDateString()}.csv`
    this.fileService.downloadAsCSV(invoice, name)
  }

  pageChanged(e: number) {
    this.appPagination.pageNumber = e;
    this.paginationRequest = new PaginationRequest<FinancialDebtFilter>(this.appPagination, this.filter);
    this.getDebts();
  }

  openFilterDebts() {
    const modalRef = this.modalService.open(PrivateFilterFinanceDebtsModalComponent, { size: 'lg' });
    modalRef.componentInstance.filter = this.filter;

    const sub = modalRef.componentInstance.newFilter.subscribe({
      next: (filter: FinancialDebtFilter) => {
        this.filter = filter;
        this.pageChanged(1);
      }
    });

    this.subscriptions.push(sub);
  }

  openPayDebtModal(): void {
    const modalRef = this.modalService.open(PrivateDebtPaymentModalsComponent, { size: 'lg' });
    modalRef.componentInstance.debt = this.debt;
    modalRef.componentInstance.paid = this.paid;
    modalRef.componentInstance.filter = this.filter;

    const sub = modalRef.componentInstance.newPayment.subscribe({
      next: () => {
        this.pageChanged(1);
      }
    });

    this.subscriptions.push(sub);
  }

}
