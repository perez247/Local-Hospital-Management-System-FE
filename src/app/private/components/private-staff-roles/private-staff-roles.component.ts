import { CustomToastService } from './../../../shared/services/common/custom-toast/custom-toast.service';
import { finalize } from 'rxjs';
import { SharedUtilityComponent } from './../../../shared/components/shared-utility/shared-utility.component';
import { EventBusService } from './../../../shared/services/common/event-bus/event-bus.service';
import { AuthService } from './../../../shared/services/api/auth/auth.service';
import { StaffService } from './../../../shared/services/api/staff/staff.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppUser } from 'src/app/shared/core/models/app-user';
import { AppConstants, ILookUp } from 'src/app/shared/core/models/app-constants';
import { AppRoles } from 'src/app/shared/core/models/app-roles';

@Component({
  selector: 'app-private-staff-roles',
  templateUrl: './private-staff-roles.component.html',
  styleUrls: ['./private-staff-roles.component.scss']
})
export class PrivateStaffRolesComponent extends SharedUtilityComponent implements OnInit {

  @Output() reload = new EventEmitter<string>();

  @Input() user?: AppUser;

  roles: ILookUp[] = [];
  userRoles = {} as any;

  disableForm = true;

  userSections = AppConstants.UserSections;

  rolesAccess = AppRoles;

  constructor(
    private staffService: StaffService,
    private authService: AuthService,
    private eventBus: EventBusService,
    private toast: CustomToastService
  ) {
    super();
  }

  override ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.roles = this.eventBus.getState().lookUps.value?.filter(x => x.type === AppConstants.LookUpType.StaffRoleEnum) ?? [];
    this.roles.forEach(x => {
      this.userRoles[x.name] = false;
    });

    this.user?.userRoles?.forEach(a => {
      this.userRoles[a] = true;
    })
  }

  edit(): void {
    this.disableForm = false;
  }

  cancelEdit(): void {
    this.disableForm = true;
    this.initializeForm();
  }

  beginUpdate(): void {
    const data: string[] = [];
    Object.keys(this.userRoles).forEach(x => {
      if (this.userRoles[x]) {
        data.push(x);
      }
    });

    const dataToSend = {
      userId: this.user?.base?.id,
      staffRoleEnum: data
    }

    this.isLoading = true;
    const sub = this.staffService.updateRoles(dataToSend)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: () => {
          this.toast.success("Roles updated successfully");
          this.reload.emit(this.userSections.staffRoles);
        },
        error: (error) => {
          throw error;
        }
      });

    this.subscriptions.push(sub);
  }
}
