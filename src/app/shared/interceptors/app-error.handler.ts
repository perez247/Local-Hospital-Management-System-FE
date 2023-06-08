import { IToastConfig } from 'src/app/shared/components/shared-toast/shared-toast.component';
import { EventBusData, EventBusActions } from 'src/app/shared/services/common/event-bus/event-bus-action';
import { UtilityHelpers } from 'src/app/shared/core/functions/utility-helpers';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { EventBusService } from './../services/common/event-bus/event-bus.service';
import { ErrorHandler, Inject, Injectable, Injector, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CustomToastService } from '../services/common/custom-toast/custom-toast.service';
import { AppInjector } from 'src/app/app.module';
import { TimeoutError } from 'rxjs';
// import { NotifyService } from '../services/common/notify/notify.service';

@Injectable({
  providedIn: 'root'
  })
export class AppErrorHandler implements ErrorHandler {

    constructor(
      private eventBus: EventBusService,
      private zone: NgZone
      ) {}

    handleError(error: any): void {
      const toast = AppInjector.get(CustomToastService);
      console.log(error);

      if (typeof(error) === 'string') {
        this.zone.run(() => {
          toast.error(error);
          // this.eventBus.emit({ key: EventBusActions.toast, value: { messsage: error, status: 'error' } } as EventBusData<IToastConfig>);
        })
      }

      else if (error instanceof HttpErrorResponse) {
        this.zone.run(() => {
          UtilityHelpers.showError(error, toast);
        });
      }

      else if (error instanceof TimeoutError) {
        const errAsObj: TimeoutError = error as TimeoutError;
        this.zone.run(() => {
          toast.error('Connection timed out: Kindly check your internet connection');
          // this.eventBus.emit({ key: EventBusActions.toast, value: { messsage: 'Kindly check your internet connection', status: 'error' } } as EventBusData<IToastConfig>);
        })
      }

      else {
        this.zone.run(() => {
          console.log(error);
          toast.error('Application unable to load, kindly refresh page');
        })
      }
    }

}

export const AppErrorInterceptorProvider = {
    provide: ErrorHandler,
    useClass: AppErrorHandler
};
