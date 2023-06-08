import { AppFileService } from '../../../shared/services/common/app-file/app-file.service';
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { finalize } from "rxjs";
import { SharedUtilityComponent } from "src/app/shared/components/shared-utility/shared-utility.component";
import { AppUser } from "src/app/shared/core/models/app-user";
import { ApplicationRoutes } from "src/app/shared/core/routes/app-routes";
import { StaffService } from "src/app/shared/services/api/staff/staff.service";
import { CustomErrorService } from "src/app/shared/services/common/custom-error/custom-error.service";
import { CustomToastService } from "src/app/shared/services/common/custom-toast/custom-toast.service";
import { AddAStaffModalFunctions } from "./private-add-a-staff-modal-functions";


@Component({
  selector: 'app-private-add-a-staff-modal',
  templateUrl: './private-add-a-staff-modal.component.html',
  styleUrls: ['./private-add-a-staff-modal.component.scss']
})
export class PrivateAddAStaffModalComponent extends SharedUtilityComponent implements OnInit {

  form: FormGroup = {} as any;
  routes = ApplicationRoutes.generateRoutes();

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    public errorService: CustomErrorService,
    private router: Router,
    private toast: CustomToastService,
    private staffService: StaffService,
    private appFileService: AppFileService
    ) {
    super();
  }

  override ngOnInit(): void {
    this.form = AddAStaffModalFunctions.createForm(this.fb);
  }

  updateFormFromAutoComplete(staff: AppUser): void {
    this.form.patchValue({
      patientId: staff.patient?.base?.id,
      firstName: staff.firstName,
      lastName: staff.lastName,
      otherName: staff.otherName,
      address: staff.address,
      email: 'hidden@hidden.com'
    });

    this.form.disable();
  }

  createNewStaff(): void {
    this.isLoading = true;
    const sub = this.staffService.createStaff(this.form.value)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data: any) => {
          if (data.password && data.password.length > 2) {
            this.appFileService.downloadAsCSV([data], 'user_credentials.csv');
          }
          this.toast.success('Staff created successfully');
          this.router.navigate([`${this.routes.privateRoute.single_staff(data.userId).$absolutePath}`]);
          this.activeModal.close();
        },
        error: (error) => {
          this.errorService.setFormErrors(error, this.form);
        }
      });

      this.subscriptions.push(sub);
  }
}
