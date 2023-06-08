import { FormBuilder, FormGroup } from "@angular/forms";
import { filter } from "rxjs";
import { CustomValidator } from "src/app/shared/validations/custom-validators";

export class AddInventoryDependenciesModalFunctions {
  public static createForm(fb: FormBuilder): FormGroup
  {
    return fb.group({
      inventoryId: [null],
      inventoryName: [null],
      amount: [null, [CustomValidator.isNumber]],
    });
  }
}
