import { IAppBillingSetting } from './../../../shared/core/models/app-setting';
import { IAppSetting } from 'src/app/shared/core/models/app-setting';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { AppConstants } from 'src/app/shared/core/models/app-constants';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PrivateBillingSettingFunctions } from './private-billing-setting-functions';
import { SettingService } from 'src/app/shared/services/api/setting/setting.service';
import { CustomToastService } from 'src/app/shared/services/common/custom-toast/custom-toast.service';
import { CustomErrorService } from 'src/app/shared/services/common/custom-error/custom-error.service';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { finalize } from 'rxjs';
import { AppRoles } from 'src/app/shared/core/models/app-roles';

@Component({
  selector: 'app-private-billing-setting',
  templateUrl: './private-billing-setting.component.html',
  styleUrls: ['./private-billing-setting.component.scss']
})
export class PrivateBillingSettingComponent extends SharedUtilityComponent implements OnInit {

  @Input() setting?: IAppSetting;
  @Output() reload = new EventEmitter<string>();

  section = AppConstants.UserSections.settingBilling;

  form: FormGroup = {} as any;

  disableForm = true;

  roles = AppRoles;

  constructor(
    private settingService: SettingService,
    private fb: FormBuilder,
    private toast: CustomToastService,
    public errorService: CustomErrorService,
  ) {
    super();
  }

  override ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    const d = JSON.parse(this.setting?.data || '') as IAppBillingSetting;
    this.form = PrivateBillingSettingFunctions.createForm(this.fb, d);
    this.disableForm = true;
  }

  edit(): void {
    this.disableForm = false;
  }

  cancelEdit(): void {
    this.form.reset();
    this.initializeForm();
  }

  beginUpdate(): void {
    this.isLoading = true;
    const d: any = this.setting;

    const data = {
      ...d
    };

    data.data = JSON.stringify(this.form.value);
    data.appSettingType = data.type;

    const sub = this.settingService.updateSetting(data)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {
          this.toast.success('Billing details updated successfully')
          this.reload.emit(this.section);
        },
        error: (error) => {
          this.errorService.setFormErrors(error, this.form)
        }
      });
    this.subscriptions.push(sub);
  }
}
