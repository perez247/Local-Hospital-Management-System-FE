import { FormBuilder, FormGroup } from "@angular/forms";
import { CustomValidator } from "src/app/shared/validations/custom-validators";

export class AddInventoryModalFunctions {
  public static createForm(fb: FormBuilder): FormGroup
  {
    return fb.group({
      name: [null, [CustomValidator.CustomRequired('Name'), CustomValidator.MaxLength(200)]],
      appInventoryType: [null, [CustomValidator.CustomRequired('Inventory type'), CustomValidator.MaxLength(200)]],
      notifyWhenLow: [false],
      howLow: [10],
      quantity: [0],
    });
  }
}
