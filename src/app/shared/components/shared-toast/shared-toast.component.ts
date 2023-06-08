import { EventBusActions } from 'src/app/shared/services/common/event-bus/event-bus-action';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { EventBusService } from 'src/app/shared/services/common/event-bus/event-bus.service';
import { Component, OnInit } from '@angular/core';
import { faTimesCircle, faCheckCircle, faExclamationTriangle, faExclamation } from '@fortawesome/free-solid-svg-icons';
import { timer } from 'rxjs';

export interface IToastConfig {
  messsage: string,
  status: 'success' | 'error' | 'warning' | 'standard';
}

@Component({
  selector: 'app-shared-toast',
  templateUrl: './shared-toast.component.html',
  styleUrls: ['./shared-toast.component.scss'],
  host: { class: 'toast-container position-fixed top-0 end-0 p-3', style: 'z-index: 1200' },
})
export class SharedToastComponent extends SharedUtilityComponent implements OnInit {

  toasts: any[] = [];
  toastConfig = {
    error: {
      classname: 'bg-danger text-light',
      delay: 5000,
      icon: faTimesCircle
    },
    success: {
      classname: 'bg-success text-light',
      delay: 5000,
      icon: faCheckCircle
    },
    warning: {
      classname: 'bg-warning text-light',
      delay: 5000,
      icon: faExclamationTriangle
    },
    standard: {
      classname: 'bg-primary text-light',
      delay: 5000,
      icon: faExclamation
    },
  }

  hide = false;
  constructor(
    private eventBus: EventBusService
  ) {
    super();
  }

  override ngOnInit(): void {
    this.listenForToast();
  }

	remove(toast: any) {
		this.toasts = this.toasts.filter((t) => t !== toast);
	}

  listenForToast(): void {
    const sub = this.eventBus.on(EventBusActions.toast, (newToast: IToastConfig) => {
      this.hide = true;
      timer(3000).subscribe({
        next: () =>{
          let options: any = this.toastConfig[newToast.status];
          options.message = newToast.messsage;
          this.toasts.push(options);
          console.log(this.toasts);
          this.hide = false;
        }
      });
    });
  }

}
