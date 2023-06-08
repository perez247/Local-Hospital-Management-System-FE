import { FinancialService } from 'src/app/shared/services/api/financial/financial.service';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { Component, OnInit } from '@angular/core';
import { faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';
import { ApplicationRoutes } from 'src/app/shared/core/routes/app-routes';
import { AppPaid, FinancialDebtFilter } from 'src/app/shared/core/models/financial';
import { AppPagination, PaginationRequest, PaginationResponse } from 'src/app/shared/core/models/pagination';
import { finalize } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PrivateFilterFinanceDebtsModalComponent } from '../../modals/private-filter-finance-debts-modal/private-filter-finance-debts-modal.component';

@Component({
  selector: 'app-private-finance-paid',
  templateUrl: './private-finance-paid.component.html',
  styleUrls: ['./private-finance-paid.component.scss']
})
export class PrivateFinancePaidComponent extends SharedUtilityComponent implements OnInit {

  fonts = { faHandHoldingDollar }

  routes = ApplicationRoutes.generateRoutes();

  item = 0;

  paid: AppPaid[] = [];
  appPagination = new AppPagination();
  filter = new FinancialDebtFilter();
  paginationRequest = new PaginationRequest<FinancialDebtFilter>(this.appPagination, this.filter);
  paginationResponse = new PaginationResponse<AppPaid[]>();

  arr: any[] = [];

  constructor(
    private financialService: FinancialService,
    private modalService: NgbModal,
  ) {
    super();
  }

  override ngOnInit(): void {
    this.getPaid();
  }

  getPaid(): void {
    this.isLoading = true;
    const sub = this.financialService.paid(this.paginationRequest)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {
          this.paginationResponse = data;
          this.paid = data.result ?? [];
        },
        error: (error) => {
          throw error;
        }
      });

    this.subscriptions.push(sub);
  }

  pageChanged(e: number) {
    this.appPagination.pageNumber = e;
    this.paginationRequest = new PaginationRequest<FinancialDebtFilter>(this.appPagination, this.filter);
    this.getPaid();
  }

  openFilter() {
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

}
