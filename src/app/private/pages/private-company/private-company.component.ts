import { Component, OnInit } from "@angular/core";
import { faBuilding, faEllipsisV, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { finalize } from "rxjs";
import { SharedUtilityComponent } from "src/app/shared/components/shared-utility/shared-utility.component";
import { AppRoles } from "src/app/shared/core/models/app-roles";
import { AppUser, UserFilter } from "src/app/shared/core/models/app-user";
import { AppPagination, PaginationRequest, PaginationResponse } from "src/app/shared/core/models/pagination";
import { ApplicationRoutes } from "src/app/shared/core/routes/app-routes";
import { UserService } from "src/app/shared/services/api/user/user.service";
import { PrivateAddCompanyModalComponent } from "../../modals/private-add-company-modal/private-add-company-modal.component";
import { PrivateFilterCompaniesModalComponent } from "../../modals/private-filter-companies-modal/private-filter-companies-modal.component";


@Component({
  selector: 'app-private-company',
  templateUrl: './private-company.component.html',
  styleUrls: ['./private-company.component.scss']
})
export class PrivateCompanyComponent extends SharedUtilityComponent implements OnInit {

  fonts = { faBuilding, faEllipsisV, faChevronDown }

  routes = ApplicationRoutes.generateRoutes();

  companies: AppUser[] = [];
  appPagination = new AppPagination();
  filter = new UserFilter('company');
  paginationRequest = new PaginationRequest<UserFilter>(this.appPagination, this.filter);
  paginationResponse = new PaginationResponse<AppUser[]>();

  roles = AppRoles;

  constructor(
    private userService: UserService,
    private modalService: NgbModal
  ) {
    super();
  }

  override ngOnInit(): void {
    this.getCompanies();
  }

  getCompanies(): void {
    this.isLoading = true;
    const sub = this.userService.getUsers(this.paginationRequest)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {
          this.paginationResponse = data;
          this.companies = data.result ?? [];
        },
        error: (error) => {
          throw error;
        }
      });
    this.subscriptions.push(sub);
  }

  pageChanged(e: number) {
    this.appPagination.pageNumber = e;
    this.paginationRequest = new PaginationRequest<UserFilter>(this.appPagination, this.filter);
    this.getCompanies();
  }

  openFilterCompanies() {
    const modalRef = this.modalService.open(PrivateFilterCompaniesModalComponent);
    modalRef.componentInstance.filter = this.filter;

    const sub = modalRef.componentInstance.newFilter.subscribe({
      next: (filter: UserFilter) => {
        this.filter = filter;
        this.pageChanged(1);
      }
    });

    this.subscriptions.push(sub);
  }

  openAddCompanyModal() {
    this.modalService.open(PrivateAddCompanyModalComponent, { size: 'lg' });
  }

}
