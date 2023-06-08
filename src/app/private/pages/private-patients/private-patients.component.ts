import { ApplicationRoutes } from './../../../shared/core/routes/app-routes';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppPagination, PaginationRequest, PaginationResponse } from './../../../shared/core/models/pagination';
import { Component, OnInit } from '@angular/core';
import { faBedPulse, faEllipsisV, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { finalize } from 'rxjs';
import { AppUser, UserFilter } from 'src/app/shared/core/models/app-user';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { UserService } from 'src/app/shared/services/api/user/user.service';
import { PrivateFilterPatientsModalComponent } from '../../modals/private-filter-patients-modal/private-filter-patients-modal.component';
import { PrivateAddAPatientModalComponent } from '../../modals/private-add-a-patient-modal/private-add-a-patient-modal.component';
import { AppRoles } from 'src/app/shared/core/models/app-roles';
import { CustomToastService } from 'src/app/shared/services/common/custom-toast/custom-toast.service';


@Component({
  selector: 'app-private-patients',
  templateUrl: './private-patients.component.html',
  styleUrls: ['./private-patients.component.scss']
})
export class PrivatePatientsComponent extends SharedUtilityComponent implements OnInit {

  fonts = { faBedPulse, faEllipsisV, faChevronDown }

  routes = ApplicationRoutes.generateRoutes();

  patients: AppUser[] = [];
  appPagination = new AppPagination();
  filter = new UserFilter('patient');
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
    this.getPatients();
  }

  getPatients(): void {
    this.isLoading = true;
    const sub = this.userService.getUsers(this.paginationRequest)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {
          this.paginationResponse = data;
          this.patients = data.result ?? [];
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
    this.getPatients();
  }

  openFilterPatients() {
    const modalRef = this.modalService.open(PrivateFilterPatientsModalComponent);
    modalRef.componentInstance.filter = this.filter;

    const sub = modalRef.componentInstance.newFilter.subscribe({
      next: (filter: UserFilter) => {
        this.filter = filter;
        this.pageChanged(1);
      }
    });

    this.subscriptions.push(sub);
  }

  openAddPatientModal() {
    this.modalService.open(PrivateAddAPatientModalComponent, { size: 'lg' });
  }

}
