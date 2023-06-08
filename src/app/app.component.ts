import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { Component, OnInit } from '@angular/core';
import { ILookUp } from './shared/core/models/app-constants';
import { AuthService } from './shared/services/api/auth/auth.service';
import { CustomToastService } from './shared/services/common/custom-toast/custom-toast.service';
import { EventBusActions, EventBusData } from './shared/services/common/event-bus/event-bus-action';
import { EventBusService } from './shared/services/common/event-bus/event-bus.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends SharedUtilityComponent implements OnInit {

  constructor(
    private eventBus: EventBusService,
    private authService: AuthService,
    private toast: CustomToastService
    ) {
    super();
  }

  override ngOnInit(): void {
    this.eventBus.initialize();
    this.setLookUps();
  }

  setLookUps(): void {
    this.authService.getLookUps()
    .subscribe({
      next: (data) => {
        this.eventBus.emit({ key: EventBusActions.state.lookUps, value: data} as EventBusData<ILookUp[]>)
      },
      error: (error) => {
        this.toast.error('Failed to get lookups, kindly check your internet connection');
        throw error;
      }
    });
  }
}
