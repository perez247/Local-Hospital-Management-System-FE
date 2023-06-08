import { finalize } from 'rxjs';
import { SharedUtilityComponent } from './../../../shared/components/shared-utility/shared-utility.component';
import { Component, OnInit } from '@angular/core';
import { SettingService } from 'src/app/shared/services/api/setting/setting.service';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { AppConstants } from 'src/app/shared/core/models/app-constants';
import { IAppSetting } from 'src/app/shared/core/models/app-setting';

@Component({
  selector: 'app-private-settings',
  templateUrl: './private-settings.component.html',
  styleUrls: ['./private-settings.component.scss']
})
export class PrivateSettingsComponent extends SharedUtilityComponent implements OnInit {

  fonts = { faCog }
  userSections = AppConstants.UserSections;
  currentSection = this.userSections.settingBilling;

  settings: IAppSetting[] = [];
  billSetting?: IAppSetting;

  disableTabs = true;

  constructor(
    private settingService: SettingService
  ) {
    super();
  }

  override ngOnInit(): void {
    this.getSettings(this.currentSection);
  }

  getSettings(currentSection: string): void {
    this.currentSection = currentSection;
    this.isLoading = true;
    const sub = this.settingService.getSettings()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {
          this.settings = data;
          this.billSetting = this.settings.find(x => x.type === 'billings');
        },
        error: (error) => {
          throw error;
        }
      });

    this.subscriptions.push(sub);
  }
}
