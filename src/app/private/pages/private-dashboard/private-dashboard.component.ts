import { finalize } from 'rxjs';
import { StaffService } from 'src/app/shared/services/api/staff/staff.service';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { Component, OnInit } from '@angular/core';
import { faSignature, faEllipsisV, faHamburger, faBedPulse, faChartLine, faClipboardUser, faBuilding, faWarehouse, faCalendarCheck, faTicket, faCoins, faSackXmark, faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';
import { ApplicationRoutes } from 'src/app/shared/core/routes/app-routes';
import { AppDashboard } from 'src/app/shared/core/models/app-dashboard';

@Component({
  selector: 'app-private-dashboard',
  templateUrl: './private-dashboard.component.html',
  styleUrls: ['./private-dashboard.component.scss']
})
export class PrivateDashboardComponent extends SharedUtilityComponent implements OnInit {

  constructor(
    private staffService: StaffService
  ) {
    super();
  }

  fonts = { faSignature, faEllipsisV, faHamburger, faBedPulse, faChartLine, faClipboardUser, faBuilding, faWarehouse, faCalendarCheck, faTicket, faCoins, faSackXmark, faHandHoldingDollar }

  appRroutes = ApplicationRoutes.generateRoutes();

  dashboard: AppDashboard = {} as AppDashboard;

  override ngOnInit(): void {
    this.getStats();
  }

  getStats(): void {
    this.isLoading = true;
    const sub = this.staffService.dashboardStats()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data: AppDashboard) => {
          this.dashboard = data;
        },
        error: (error) => {
          throw error;
        }
      });

    this.subscriptions.push(sub);
  }

}
