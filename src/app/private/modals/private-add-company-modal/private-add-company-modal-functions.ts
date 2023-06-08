import { FormBuilder, FormGroup } from "@angular/forms";
import { CustomValidator } from "src/app/shared/validations/custom-validators";


export class AddCompanyModalFunctions {
  public static createForm(fb: FormBuilder): FormGroup
  {
    return fb.group({
      email: [null, [CustomValidator.CustomRequired('Email'), CustomValidator.CustomEmail(), CustomValidator.MaxLength(200)]],
      name: [null, [CustomValidator.CustomRequired('Name'), CustomValidator.MaxLength(200)]],
      address: [null, [CustomValidator.CustomRequired('Address'), CustomValidator.MaxLength(2000)]],
      description: [null, [CustomValidator.MaxLength(2000)]],
      uniqueId: [null, [CustomValidator.MaxLength(2000)]],
      otherId: [null, [CustomValidator.MaxLength(2000)]],
      homeCompany: [false],
      forIndividual: [false],
    });
  }
}

