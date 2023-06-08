import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { AppConstants, ILookUp } from 'src/app/shared/core/models/app-constants';
import { AppRoles } from 'src/app/shared/core/models/app-roles';
import { AppInventory } from 'src/app/shared/core/models/inventory';
import { InventoryService } from 'src/app/shared/services/api/inventory/inventory.service';
import { CustomErrorService } from 'src/app/shared/services/common/custom-error/custom-error.service';
import { CustomToastService } from 'src/app/shared/services/common/custom-toast/custom-toast.service';
import { EventBusService } from 'src/app/shared/services/common/event-bus/event-bus.service';
import { PrivateUploadProfilePictureModalComponent } from '../../modals/private-upload-profile-picture-modal/private-upload-profile-picture-modal.component';
import { PrivateInventoryDetailsFunctions } from './private-inventory-details-functions';

@Component({
  selector: 'app-private-inventory-details',
  templateUrl: './private-inventory-details.component.html',
  styleUrls: ['./private-inventory-details.component.scss']
})
export class PrivateInventoryDetailsComponent  extends SharedUtilityComponent implements OnInit {

  @Output() reload = new EventEmitter<string>();

  @Input() inventory?: AppInventory;

  fonts = { faPencilAlt, faTrash }

  profile? = '';

  form: FormGroup = {} as any;
  disableForm = true;

  userSections = AppConstants.UserSections;

  lookups: ILookUp[] = [];
  lookupType = AppConstants.LookUpType;

  roles = AppRoles;

  constructor(
    private route: ActivatedRoute,
    private inventoryService: InventoryService,
    private fb: FormBuilder,
    public errorService: CustomErrorService,
    private modalService: NgbModal,
    private eventBus: EventBusService,
    private toast: CustomToastService
  ) {
    super();
  }

  override ngOnInit(): void {
    this.profile = this.inventory?.profile;
    this.initializeForm();
    this.setLookUp();
  }

  ngAfterContentChecked() {}

  setLookUp(): void {
    this.lookups = this.eventBus.getState().lookUps.value?.filter(x => x.type === this.lookupType.AppInventoryType) ?? [];
  }

  initializeForm(): void {
    this.form = PrivateInventoryDetailsFunctions.createForm(this.fb, this.inventory);
    this.disableForm = true;
  }

  edit(): void {
    this.disableForm = false;
  }

  cancelEdit(): void {
    this.form.reset();
    this.initializeForm();
    this.inventory!.profile = this.profile;
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
    this.inventory!.profile = base64;
    this.form.patchValue({
      profile: this.inventory?.profile
    });
  }

  beginUpdate(): void {
    this.isLoading = true;
    const sub = this.inventoryService.createInventory(this.form.value)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {
          this.toast.success('Details updated successfully');
          this.reload.emit(this.userSections.inventoryDetails);
        },
        error: (error) => {
          this.errorService.setFormErrors(error, this.form);
          // console.log(error);
        }
      });
    this.subscriptions.push(sub);
  }

}
