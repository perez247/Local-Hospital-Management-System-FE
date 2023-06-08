import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { AppConstants } from 'src/app/shared/core/models/app-constants';
import { AppUser } from 'src/app/shared/core/models/app-user';
import { CustomErrorService } from 'src/app/shared/services/common/custom-error/custom-error.service';
import { CustomToastService } from 'src/app/shared/services/common/custom-toast/custom-toast.service';
import { CompanyService } from 'src/app/shared/services/api/company/company.service';
import { CompanyDetailFunctions } from './private-company-details-functions';
import { PrivateUploadProfilePictureModalComponent } from '../../modals/private-upload-profile-picture-modal/private-upload-profile-picture-modal.component';
import { AppRoles } from 'src/app/shared/core/models/app-roles';

@Component({
  selector: 'app-private-company-details',
  templateUrl: './private-company-details.component.html',
  styleUrls: ['./private-company-details.component.scss']
})
export class PrivateCompanyDetailsComponent extends SharedUtilityComponent implements OnInit {

  @Output() reload = new EventEmitter<string>();

  @Input() user?: AppUser;

  fonts = { faPencilAlt, faTrash }

  profile? = '';

  form: FormGroup = {} as any;
  disableForm = true;

  userSections = AppConstants.UserSections;

  roles = AppRoles;

  constructor(
    private fb: FormBuilder,
    public errorService: CustomErrorService,
    private modalService: NgbModal,
    private companyService: CompanyService,
    private toast: CustomToastService,
    ) {
    super();
  }

  override ngOnInit(): void {
    this.profile = this.user?.profile;
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = CompanyDetailFunctions.createForm(this.fb, this.user);
    this.disableForm = true;
  }

  edit(): void {
    this.disableForm = false;
  }

  cancelEdit(): void {
    this.form.reset();
    this.initializeForm();
    this.user!.profile = this.profile;
  }

  openUploadProfileModal(): void {
    const modalRef = this.modalService.open(PrivateUploadProfilePictureModalComponent, { size: 'lg'});

    const sub = modalRef.componentInstance.newImage.subscribe({
      next: (base64: string) => {
        this.updateProfilePicture(base64);
      }
    });

    this.subscriptions.push(sub);
  }

  updateProfilePicture(base64: string) {
    console.log(base64);
    this.user!.profile = base64;
    this.form.patchValue({
      profile: this.user?.profile
    });
  }

  beginUpdate(): void {
    this.isLoading = true;
    const sub = this.companyService.updateDetails(this.form.value)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {
          this.toast.success("Company update successfully");
          this.reload.emit(this.userSections.companyDetails);
        },
        error: (error) => {
          this.errorService.setFormErrors(error, this.form)
          // console.log(error);
        }
      });
    this.subscriptions.push(sub);
  }

}
