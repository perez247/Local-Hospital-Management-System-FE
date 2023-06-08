import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { AppUser, UserFilter } from 'src/app/shared/core/models/app-user';
import { AppPagination, PaginationRequest, PaginationResponse } from 'src/app/shared/core/models/pagination';
import { finalize } from 'rxjs';
import { faBedPulse, faEllipsisV, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/shared/services/api/user/user.service';
import { AppConstants } from 'src/app/shared/core/models/app-constants';
import { CustomToastService } from 'src/app/shared/services/common/custom-toast/custom-toast.service';
import { ApplicationRoutes } from 'src/app/shared/core/routes/app-routes';

@Component({
  selector: 'app-private-single-patient',
  templateUrl: './private-single-patient.component.html',
  styleUrls: ['./private-single-patient.component.scss']
})
export class PrivateSinglePatientComponent extends SharedUtilityComponent  implements OnInit {

  fonts = { faBedPulse, faEllipsisV, faChevronDown }
  userSections = AppConstants.UserSections;
  currentSection = this.userSections.personalDetails;

  patients: AppUser[] = [];
  patient?: AppUser;
  appPagination = new AppPagination();
  filter = new UserFilter('patient');
  paginationRequest = new PaginationRequest<UserFilter>(this.appPagination, this.filter);
  paginationResponse = new PaginationResponse<AppUser[]>();

  disableTabs = true;
  routes = ApplicationRoutes.generateRoutes();

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private toast: CustomToastService,
  ) {
    super();
  }

  override ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.filter.userId = id;
    this.paginationRequest = new PaginationRequest<UserFilter>(this.appPagination, this.filter);
    this.getPatient(this.currentSection);
  }

  getPatient(currentSection: string): void {
    this.currentSection = currentSection;
    this.isLoading = true;
    const sub = this.userService.getUsers(this.paginationRequest)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {

          if (data.totalItems <= 0) {
            this.toast.error('Patient not found');
            this.router.navigate([this.routes.privateRoute.patients().$absolutePath]);
            return;
          }

          this.paginationResponse = data;
          this.patients = data.result ?? [];
          this.patient = this.patients[0];

        },
        error: (data) => {
          console.log(data);
        }
      });

      this.subscriptions.push(sub);
  }

}
