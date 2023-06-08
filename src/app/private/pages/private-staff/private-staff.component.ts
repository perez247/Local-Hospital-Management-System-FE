import { Component, OnInit } from '@angular/core';
import { faClipboardUser, faEllipsisV, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { AppRoles } from 'src/app/shared/core/models/app-roles';
import { AppUser, UserFilter } from 'src/app/shared/core/models/app-user';
import { AppPagination, PaginationRequest, PaginationResponse } from 'src/app/shared/core/models/pagination';
import { ApplicationRoutes } from 'src/app/shared/core/routes/app-routes';
import { UserService } from 'src/app/shared/services/api/user/user.service';
import { PrivateAddAStaffModalComponent } from '../../modals/private-add-a-staff-modal/private-add-a-staff-modal.component';
import { PrivateFilterStaffModalComponent } from '../../modals/private-filter-staff-modal/private-filter-staff-modal.component';

@Component({
  selector: 'app-private-staff',
  templateUrl: './private-staff.component.html',
  styleUrls: ['./private-staff.component.scss']
})
export class PrivateStaffComponent extends SharedUtilityComponent implements OnInit {

  fonts = { faClipboardUser, faEllipsisV, faChevronDown }

  routes = ApplicationRoutes.generateRoutes();

  staff: AppUser[] = [];
  appPagination = new AppPagination();
  filter = new UserFilter('staff');
  paginationRequest = new PaginationRequest<UserFilter>(this.appPagination, this.filter);
  paginationResponse = new PaginationResponse<AppUser[]>();

  roles = AppRoles;

  constructor(
    private userService: UserService,
    private modalService: NgbModal,
  ) {
    super();
  }

  override ngOnInit(): void {
    this.getStaff();
  }

  getStaff(): void {
    this.isLoading = true;
    const sub = this.userService.getUsers(this.paginationRequest)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {
          this.paginationResponse = data;
          this.staff = data.result ?? [];
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
    this.getStaff();
  }

  openFilterStaff() {
    const modalRef = this.modalService.open(PrivateFilterStaffModalComponent);
    modalRef.componentInstance.filter = this.filter;

    const sub = modalRef.componentInstance.newFilter.subscribe({
      next: (filter: UserFilter) => {
        this.filter = filter;
        this.pageChanged(1);
      }
    });

    this.subscriptions.push(sub);
  }

  openAddStaffModal() {
    this.modalService.open(PrivateAddAStaffModalComponent, { size: 'lg' });
  }
}
