import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { finalize } from "rxjs";
import { SharedUtilityComponent } from "src/app/shared/components/shared-utility/shared-utility.component";
import { ILookUp, AppConstants } from "src/app/shared/core/models/app-constants";
import { AppRoles } from "src/app/shared/core/models/app-roles";
import { AppUser } from "src/app/shared/core/models/app-user";
import { ApplicationRoutes } from "src/app/shared/core/routes/app-routes";
import { InventoryService } from "src/app/shared/services/api/inventory/inventory.service";
import { CustomErrorService } from "src/app/shared/services/common/custom-error/custom-error.service";
import { CustomToastService } from "src/app/shared/services/common/custom-toast/custom-toast.service";
import { EventBusService } from "src/app/shared/services/common/event-bus/event-bus.service";
import { AddInventoryModalFunctions } from "./private-add-inventory-modal-functions";


@Component({
  selector: 'app-private-add-inventory-modal',
  templateUrl: './private-add-inventory-modal.component.html',
  styleUrls: ['./private-add-inventory-modal.component.scss']
})
export class PrivateAddInventoryModalComponent extends SharedUtilityComponent implements OnInit {

  form: FormGroup = {} as any;
  routes = ApplicationRoutes.generateRoutes();

  lookups: ILookUp[] = [];
  lookupType = AppConstants.LookUpType;

  currentUser?: AppUser | null;

  appRoles = AppRoles;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    public errorService: CustomErrorService,
    private router: Router,
    private toast: CustomToastService,
    private eventBus: EventBusService,
    private inventoryService: InventoryService,
    ) {
    super();
  }

  override ngOnInit(): void {
    this.form = AddInventoryModalFunctions.createForm(this.fb);
    this.setLookUp();
  }

  setLookUp(): void {
    const lookups = this.eventBus.getState().lookUps.value?.filter(x => x.type === this.lookupType.AppInventoryType) ?? [];

    this.currentUser = this.eventBus.getState().user.value;

    const isAdmin = this.currentUser?.userRoles?.find(x => x === this.appRoles.admin);

    if (isAdmin) {
      this.lookups = lookups;
      return;
    }

    const userRoles = this.eventBus.getState().user.value?.userRoles || [];

    userRoles.forEach(x => {
      let inRole = lookups?.find(y => y.name == x);
      if (inRole) {
        this.lookups.push(inRole);
      }
    });
  }

  createNewInventory(): void {
    this.isLoading = true;
    const sub = this.inventoryService.createInventory(this.form.value)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {
          this.toast.success('Inventory created successfully');
          this.router.navigate([`${this.routes.privateRoute.single_inventory(data.inventoryId).$absolutePath}`]);
          this.activeModal.close();
        },
        error: (error) => {
          console.log(error);
          this.errorService.setFormErrors(error, this.form);
        }
      });

      this.subscriptions.push(sub);
  }
}
