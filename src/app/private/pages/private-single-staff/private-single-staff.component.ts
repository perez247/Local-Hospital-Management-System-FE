import { EventBusActions } from './../../../shared/services/common/event-bus/event-bus-action';
import { EventBusData } from 'src/app/shared/services/common/event-bus/event-bus-action';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faBedPulse, faEllipsisV, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { finalize } from 'rxjs';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { AppConstants } from 'src/app/shared/core/models/app-constants';
import { AppUser, UserFilter } from 'src/app/shared/core/models/app-user';
import { AppPagination, PaginationRequest, PaginationResponse } from 'src/app/shared/core/models/pagination';
import { ApplicationRoutes } from 'src/app/shared/core/routes/app-routes';
import { UserService } from 'src/app/shared/services/api/user/user.service';
import { CustomToastService } from 'src/app/shared/services/common/custom-toast/custom-toast.service';
import { EventBusService } from 'src/app/shared/services/common/event-bus/event-bus.service';

@Component({
  selector: 'app-private-single-staff',
  templateUrl: './private-single-staff.component.html',
  styleUrls: ['./private-single-staff.component.scss']
})
export class PrivateSingleStaffComponent extends SharedUtilityComponent  implements OnInit {

  fonts = { faBedPulse, faEllipsisV, faChevronDown }
  userSections = AppConstants.UserSections;
  currentSection = this.userSections.personalDetails;

  staff: AppUser[] = [];
  staffItem?: AppUser;
  appPagination = new AppPagination();
  filter = new UserFilter('staff');
  paginationRequest = new PaginationRequest<UserFilter>(this.appPagination, this.filter);
  paginationResponse = new PaginationResponse<AppUser[]>();

  disableTabs = false;
  routes = ApplicationRoutes.generateRoutes();

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private toast: CustomToastService,
    private eventBus: EventBusService
  ) {
    super();
  }

  override ngOnInit(): void {
    console.log(this.route.snapshot.parent?.url);

    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.filter.userId = id;
    this.paginationRequest = new PaginationRequest<UserFilter>(this.appPagination, this.filter);
    this.getStaffList(this.currentSection);
  }

  getStaffList(currentSection: string): void {
    this.currentSection = currentSection;
    this.isLoading = true;
    const sub = this.userService.getUsers(this.paginationRequest)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {

          if (data.totalItems <= 0) {
            this.toast.error('Staff not found');
            this.router.navigate([this.routes.privateRoute.staff().$absolutePath]);
            return;
          }

          this.paginationResponse = data;
          this.staff = data.result ?? [];
          this.staffItem = this.staff[0];

          const currentUser = this.eventBus.getState().user.value;

          if (currentUser?.base?.id === this.staffItem.base?.id) {
            this.eventBus.emit({key: EventBusActions.state.currentUser, value: this.staffItem } as EventBusData<AppUser>);
          }

        },
        error: (data) => {
          throw data;
        }
      });

      this.subscriptions.push(sub);
  }

}
