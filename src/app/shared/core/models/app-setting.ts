import { Base } from "./app-user"

export interface IAppSetting {
  base: Base;
  type: string;
  data: string;
}

export interface IAppBillingSetting {
  CompanyRegistrationFee: number;
  PatientRegistrationFee: number;
  Tax: number;
}
