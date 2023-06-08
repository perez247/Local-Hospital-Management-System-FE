import { FormBuilder, FormGroup } from "@angular/forms";
import { UserFilter } from "src/app/shared/core/models/app-user";
import { FinancialDebtFilter } from "src/app/shared/core/models/financial";
import { CustomValidator } from "src/app/shared/validations/custom-validators";

export class PrivateFilterFinanceDebtsModalFunctions {

  public static createForm(fb: FormBuilder, filter?: FinancialDebtFilter): FormGroup
  {
    return fb.group({
      patientName: [filter?.patientName, [CustomValidator.CustomPattern('^[a-zA-Z0-9._ ]*$', 'Only letters, numbers, periods and underscore'), CustomValidator.MaxLength(250)]],
      patientId: [filter?.patientId],
      companyName: [filter?.companyName, [CustomValidator.CustomPattern('^[a-zA-Z0-9._ ]*$', 'Only letters, numbers, periods and underscore'), CustomValidator.MaxLength(250)]],
      companyId: [filter?.companyId],
      startDate: [filter?.startDate],
      endDate: [filter?.endDate]
    });
  }

}
