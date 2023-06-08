import { ITicketInventory } from './../../../shared/core/models/app-ticket';
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
import { AppAppointment } from 'src/app/shared/core/models/app-appointment';
import { PrivateCreatePharmacyTicketModalComponent } from '../../modals/private-create-ticket-modal/private-create-pharmacy-ticket-modal/private-create-pharmacy-ticket-modal.component';
import { Confirmable } from 'src/app/shared/decorators/confirm-action-method-decorator';

@Component({
  selector: 'app-private-ticket-inventory-template',
  templateUrl: './private-ticket-inventory-template.component.html',
  styleUrls: ['./private-ticket-inventory-template.component.scss']
})
export class PrivateTicketInventoryTemplateComponent extends SharedUtilityComponent implements OnInit {

  @Input() ticket?: AppTicket;
  @Input() appointment?: AppAppointment;
  @Input() type?: string;
  @Input() isTodayAppointment? = true;
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


  @Confirmable({
    title: 'Send ticket to department',
    html: 'Are you sure you want to send this ticket to the department. This cannot be undone',
    confirmButtonText: 'Yes Send',
    denyButtonText: 'No I changed my mind',
  })
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
          this.ticket!.sent = true;
          this.toast.success(`Ticket sent to the ${this.ticket?.appInventoryType?.replace('tickets:', '')} department`);
        },
        error: (error) => {
          throw error;
        }
      });

      this.subscriptions.push(sub);
  }


  @Confirmable({
    title: 'Delete Ticket',
    html: 'Are you sure you want to delete this ticket.',
    confirmButtonText: 'Yes Delete',
    denyButtonText: 'No I changed my mind',
  })
  deleteTicket(): void {
    this.isLoading = true;
    const data = {
      ticketId: this.ticket?.base.id,
    };
    const sub = this.ticketService.deleteTicket(data)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {
          this.reload.emit(this.type);
          this.toast.success(`Ticket deleted successfully`);
        },
        error: (error) => {
          throw error;
        }
      });

      this.subscriptions.push(sub);
  }

  editTicket(): void {
    const modalRef = this.modalService.open(PrivateCreatePharmacyTicketModalComponent, { size: 'lg' });
    modalRef.componentInstance.ticket = this.ticket;
    modalRef.componentInstance.appointment = this.appointment;
    const sub = modalRef.componentInstance.saved.subscribe({
      next: (action: boolean) => {
        if (action)
        {
          this.deleteTicket();
        }
      }
    });
    this.subscriptions.push(sub);
  }
}
