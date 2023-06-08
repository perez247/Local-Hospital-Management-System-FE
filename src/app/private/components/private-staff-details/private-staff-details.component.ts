import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { AppConstants } from 'src/app/shared/core/models/app-constants';
import { AppRoles } from 'src/app/shared/core/models/app-roles';
import { AppUser } from 'src/app/shared/core/models/app-user';
import { StaffService } from 'src/app/shared/services/api/staff/staff.service';
import { CustomErrorService } from 'src/app/shared/services/common/custom-error/custom-error.service';
import { CustomToastService } from 'src/app/shared/services/common/custom-toast/custom-toast.service';
import { StaffDetailFunctions } from './private-staff-details-functions';

@Component({
  selector: 'app-private-staff-details',
  templateUrl: './private-staff-details.component.html',
  styleUrls: ['./private-staff-details.component.scss']
})
export class PrivateStaffDetailsComponent extends SharedUtilityComponent implements OnInit {

  @Output() reload = new EventEmitter<string>();

  @Input() user?: AppUser;

  fonts = { faPencilAlt, faTrash }

  form: FormGroup = {} as any;
  disableForm = true;

  userSections = AppConstants.UserSections;
  roles = AppRoles;

  constructor(
    private fb: FormBuilder,
    public errorService: CustomErrorService,
    private modalService: NgbModal,
    private staffService: StaffService,
    private toast: CustomToastService,
    ) {
    super();
  }

  override ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = StaffDetailFunctions.createForm(this.fb, this.user);
    this.disableForm = true;
  }

  edit(): void {
    this.disableForm = false;
  }

  cancelEdit(): void {
    this.form.reset();
    this.initializeForm();
  }


  beginUpdate(): void {
    this.isLoading = true;
    const sub = this.staffService.editDetails(this.form.value)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {
          this.toast.success('Updated successfully');
          this.reload.emit(this.userSections.staffDetails);
        },
        error: (error) => {
          this.errorService.setFormErrors(error, this.form)
          // console.log(error);
        }
      });
    this.subscriptions.push(sub);
  }

}
