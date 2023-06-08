import { Injectable } from '@angular/core';
import { EventBusService } from '../event-bus/event-bus.service';
import { ToastrService } from 'ngx-toastr';

export interface ICustomToast {
  css: string;
  body: string;
  delay: number;
}

@Injectable({
  providedIn: 'root'
})
export class CustomToastService {


  toastConfig: ICustomToast = {
    delay: 25000
  } as ICustomToast;

  toasts: ICustomToast[] = [];

  constructor(
    private toast: ToastrService
    ) { }


    /**
   * @description Displays a success message with a green text and white background
   * @param message Message to be displayed
   */
     success(message: string): void {
      this.toast.success(message);
      // this.toastConfig.css = 'bg-success text-white text-center';
      // this.toastConfig.body = message;
      // this.eventBus.emit(new EventData<ICustomToast>({ name: AppEventBus.notify.toast, value: this.toastConfig }));
    }

    /**
     * @description Displays an error message with a red text and white background
     * @param message Message to be displayed
     */
    error(message: string): void {
      this.toast.error(message);
      // this.toastConfig.css = 'bg-danger text-white text-center';
      // this.toastConfig.body = message;
      // this.eventBus.emit(new EventData<ICustomToast>({ name: AppEventBus.notify.toast, value: this.toastConfig }));
    }

    /**
     * @description Displays a warning message with a green text and white background.
     * I honestly don't know if we will ever use this but for righteousness sake.
     * @param message Message to be displayed
     */
    warning(message: string): void {
      this.toast.warning(message);
      // this.toastConfig.css = 'bg-warning text-white text-center';
      // this.toastConfig.body = message;
      // this.eventBus.emit(new EventData<ICustomToast>({ name: AppEventBus.notify.toast, value: this.toastConfig }));
    }

    /**
     * @description Displays a regualr message with a dark text and white background
     * @param message Message to be displayed
     */
    message(message: string): void {
      this.toast.info(message);
      // this.toastConfig.css = 'text-center';
      // this.toastConfig.body = message;
      // this.eventBus.emit(new EventData<ICustomToast>({ name: AppEventBus.notify.toast, value: this.toastConfig }));
    }
}
