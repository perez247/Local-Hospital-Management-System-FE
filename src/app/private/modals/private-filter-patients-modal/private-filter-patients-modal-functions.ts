import { FormBuilder, FormGroup } from "@angular/forms";
import { UserFilter } from "src/app/shared/core/models/app-user";
import { CustomValidator } from "src/app/shared/validations/custom-validators";

export class FilterPatientsModalFunctions {

  public static createForm(fb: FormBuilder, filter?: UserFilter): FormGroup
  {
    return fb.group({
      name: [filter?.name, [CustomValidator.CustomPattern('^[a-zA-Z0-9._ ]*$', 'Only letters, numbers, periods and underscore'), CustomValidator.MaxLength(250)]],
      isCompany: [filter?.isCompany],
      patientCompanyId: [filter?.patientCompanyId],
      patientCompanyName: [filter?.patientCompanyName],
      userType: [filter?.userType],
      userSearchId: [filter?.userSearchId],
    });
  }

}
