import { IAppBillingSetting } from './../../../shared/core/models/app-setting';
import { FormBuilder, FormGroup } from "@angular/forms";
import { CustomValidator } from "src/app/shared/validations/custom-validators";

export class PrivateBillingSettingFunctions {
  public static createForm(fb: FormBuilder, billing?: IAppBillingSetting): FormGroup
  {
    return fb.group({
      CompanyRegistrationFee: [billing?.CompanyRegistrationFee, [CustomValidator.CustomRequired('Company Registration Fee')]],
      PatientRegistrationFee: [billing?.PatientRegistrationFee, [CustomValidator.CustomRequired('Patient Registration Fee')]],
      Tax: [billing?.Tax, [CustomValidator.CustomRequired('Tax')]],
    });
  }
}
