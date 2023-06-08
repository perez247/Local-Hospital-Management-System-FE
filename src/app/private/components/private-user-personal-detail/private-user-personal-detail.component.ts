import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { AppUser, UserFilter } from 'src/app/shared/core/models/app-user';
import { UserService } from 'src/app/shared/services/api/user/user.service';
import { CustomErrorService } from 'src/app/shared/services/common/custom-error/custom-error.service';
import { UserPersonalDetailFunctions } from './private-user-personal-detail-functions';
import { AppConstants } from 'src/app/shared/core/models/app-constants';
import { CustomToastService } from 'src/app/shared/services/common/custom-toast/custom-toast.service';
import { PrivateUploadProfilePictureModalComponent } from '../../modals/private-upload-profile-picture-modal/private-upload-profile-picture-modal.component';
import { AppRoles } from 'src/app/shared/core/models/app-roles';

@Component({
  selector: 'app-private-user-personal-detail',
  templateUrl: './private-user-personal-detail.component.html',
  styleUrls: ['./private-user-personal-detail.component.scss']
})
export class PrivateUserPersonalDetailComponent extends SharedUtilityComponent implements OnInit {

  @Output() reload = new EventEmitter<string>();

  @Input() user?: AppUser;

  fonts = { faPencilAlt, faTrash }

  profile? = '';

  form: FormGroup = {} as any;
  disableForm = true;

  userSections = AppConstants.UserSections;

  roles = AppRoles;
  editRoles: (string | undefined)[] = [];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private fb: FormBuilder,
    public errorService: CustomErrorService,
    private modalService: NgbModal,
    private toast: CustomToastService,
    private router: Router
  ) {
    super();
  }

  override ngOnInit(): void {
    this.getEditRoles();
    this.profile = this.user?.profile;
    this.initializeForm();
  }

  ngAfterContentChecked() {}

  initializeForm(): void {
    this.form = UserPersonalDetailFunctions.createForm(this.fb, this.user);
    this.disableForm = true;
  }

  getEditRoles() {
    const url: string = this.router.url;
    if (url.includes('/private/patients/'))
    {
      this.editRoles = [ this.roles.admin, this.roles.nurse, this.roles.hr ]
    } else {
      this.editRoles = [ this.roles.admin, this.roles.hr, this.user?.base?.id ]
    }
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
    this.user!.profile = base64;
    this.form.patchValue({
      profile: this.user?.profile
    });
  }

  beginUpdate(): void {
    this.isLoading = true;
    const sub = this.userService.editPersonalDetails(this.form.value)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {
          this.toast.success('Details updated successfully')
          this.reload.emit(this.userSections.personalDetails);
        },
        error: (error) => {
          this.errorService.setFormErrors(error, this.form)
          // console.log(error);
        }
      });
    this.subscriptions.push(sub);
  }

}
