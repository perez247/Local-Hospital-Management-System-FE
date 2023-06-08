import { ITicketInventory, TicketInventory } from './../../../shared/core/models/app-ticket';
import { AppInventory } from './../../../shared/core/models/inventory';
import { FormBuilder, FormGroup } from "@angular/forms";
import { AppTicket } from "src/app/shared/core/models/app-ticket";
import { CustomValidator } from 'src/app/shared/validations/custom-validators';

export class PrivateGetInventoryFunctions {

  public static createForm(fb: FormBuilder, appinventory?: ITicketInventory): FormGroup
  {

    const hasId = appinventory?.inventoryId;

    if (!hasId) {
      return fb.group({
        inventoryName: [null],
        inventoryId: [null],
        doctorsPrescription: [null, [CustomValidator.MinLength(5), CustomValidator.MaxLength(1000)]],
      });
    }
    else {
      return fb.group({
        inventoryName: [{value: appinventory?.inventoryName, disabled: true}],
        inventoryId: [appinventory.inventoryId],
        doctorsPrescription: [appinventory?.doctorsPrescription, [CustomValidator.MinLength(5), CustomValidator.MaxLength(1000)]],
      });
    }
  }

}
