import { FormBuilder, FormGroup } from "@angular/forms";
import { filter } from "rxjs";
import { AppUser } from "src/app/shared/core/models/app-user";
import { CustomValidator } from "src/app/shared/validations/custom-validators";

export class CompanyDetailFunctions {
  public static createForm(fb: FormBuilder, appUser?: AppUser): FormGroup
  {
    return fb.group({
        name: [appUser?.firstName, [CustomValidator.CustomRequired('Name'), CustomValidator.MaxLength(200)]],
        address: [appUser?.address, [CustomValidator.CustomRequired('Address'), CustomValidator.MaxLength(2000)]],
        description: [appUser?.company?.description, [CustomValidator.MaxLength(2000)]],
        uniqueId: [appUser?.company?.uniqueId, [CustomValidator.MaxLength(2000)]],
        forIndividual: [appUser?.company?.forIndividual],
        homeCompany: [appUser?.company?.homeCompany],
        otherId: [appUser?.company?.otherId, [CustomValidator.MaxLength(2000)]],
        profile: [appUser?.profile],
        companyId: [appUser?.company?.base?.id]
      });
  }
}
