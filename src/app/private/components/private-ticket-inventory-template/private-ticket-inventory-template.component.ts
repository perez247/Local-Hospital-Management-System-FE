import { ApplicationRoutes } from './../../../shared/core/routes/app-routes';
import { CustomErrorService } from './../../../shared/services/common/custom-error/custom-error.service';
import { finalize, throwError } from 'rxjs';
import { TicketService } from 'src/app/shared/services/api/ticket/ticket.service';
import { CustomToastService } from './../../../shared/services/common/custom-toast/custom-toast.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { AppTicket } from 'src/app/shared/core/models/app-ticket';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { IConfirmAction, SharedConfirmActionModalComponent } from 'src/app/shared/modals/shared-confirm-action-modal/shared-confirm-action-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppRoles } from 'src/app/shared/core/models/app-roles';

@Component({
  selector: 'app-private-ticket-inventory-template',
  templateUrl: './private-ticket-inventory-template.component.html',
  styleUrls: ['./private-ticket-inventory-template.component.scss']
})
export class PrivateTicketInventoryTemplateComponent extends SharedUtilityComponent implements OnInit {

  @Input() ticket?: AppTicket;
  @Input() type?: string;
  @Output() reload = new EventEmitter<string>();

  fonts = { faEllipsisV };

  routes = ApplicationRoutes.generateRoutes();

  roles = AppRoles;

  constructor(
    private toast: CustomToastService,
    private ticketService: TicketService,
    private errorService: CustomErrorService,
    private modalService: NgbModal,
  ) {
    super();
  }

  override ngOnInit(): void {
  }

  confirmSendToDepartment(): void {
    const data = {
      title: 'Send ticket to department',
      body: 'Are you sure you want to send this ticket to the department. This cannot be undone',
      positiveBtn: 'Yes Send',
      positiveBtnCss: 'btn btn-primary',
      nagativeBtn: 'No I changed my mind',
      negativeBtnCss: 'btn btn-danger'
    } as IConfirmAction;

    const modalRef = this.modalService.open(SharedConfirmActionModalComponent);
    modalRef.componentInstance.confirmData = data;
    const sub = modalRef.componentInstance.actionTaken.subscribe({
      next: (action: boolean) => {
        if (action)
        {
          this.sendToDepartment();
        }
      }
    });
    this.subscriptions.push(sub);
  }

  sendToDepartment(): void {
    this.isLoading = true;
    const data = {
      ticketId: this.ticket?.base.id,
      overallDescription: this.ticket?.overallDescription,
      sent: true,
      sentToFinance: false,
      appTicketStatus: this.ticket?.appTicketStatus
    };
    const sub = this.ticketService.updateTicket(data)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {
          // this.reload.emit(this.type);
          this.ticket!.sent = true;
          this.toast.success(`Ticket sent to the ${this.type?.replace('tickets:', '')} department`);
        },
        error: (error) => {
          throw error;
        }
      });

      this.subscriptions.push(sub);
  }
}
