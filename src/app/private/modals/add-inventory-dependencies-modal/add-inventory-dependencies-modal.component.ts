import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { AddInventoryDependenciesModalFunctions } from './add-inventory-dependencies-modal-functions';
import { AppInventory } from 'src/app/shared/core/models/inventory';
import { CustomToastService } from 'src/app/shared/services/common/custom-toast/custom-toast.service';

@Component({
  selector: 'app-add-inventory-dependencies-modal',
  templateUrl: './add-inventory-dependencies-modal.component.html',
  styleUrls: ['./add-inventory-dependencies-modal.component.scss']
})
export class AddInventoryDependenciesModalComponent extends SharedUtilityComponent implements OnInit {

  @Input() inventory?: AppInventory;

  form: FormGroup = {} as any;

  list = [];

  constructor(
    private fb: FormBuilder,
    private toast: CustomToastService
  ) {
    super();
  }

  override ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.form = AddInventoryDependenciesModalFunctions.createForm(this.fb);
  }

  updateFormFromAutoComplete(inventory: AppInventory): void {

    if (this.inventory?.base?.id === inventory.base?.id) {
      this.toast.error('Cannot depend on the same inventory');
      return;
    }

    this.form.patchValue({
      inventoryId: inventory.base?.id,
      inventoryName: inventory.name,
    });
  }

  addTolist(): void {

  }

}
