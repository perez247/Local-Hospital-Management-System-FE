import { EventBusService } from './../../../shared/services/common/event-bus/event-bus.service';
import { TicketService } from 'src/app/shared/services/api/ticket/ticket.service';
import { IConfirmAction, SharedConfirmActionModalComponent } from 'src/app/shared/modals/shared-confirm-action-modal/shared-confirm-action-modal.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCalendar, faPlus, faGears } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { AppAppointment, AppointmentFilter } from 'src/app/shared/core/models/app-appointment';
import { AppConstants } from 'src/app/shared/core/models/app-constants';
import { AppPagination, PaginationRequest, PaginationResponse } from 'src/app/shared/core/models/pagination';
import { ApplicationRoutes } from 'src/app/shared/core/routes/app-routes';
import { AppointmentService } from 'src/app/shared/services/api/appointment/appointment.service';
import { CustomToastService } from 'src/app/shared/services/common/custom-toast/custom-toast.service';
import { PrivateCreateTicketModalComponent } from '../../modals/private-create-ticket-modal/private-create-ticket-modal.component';
import { PrivateUpdateAppointmentModalComponent } from '../../modals/private-update-appointment-modal/private-update-appointment-modal.component';
import { AppRoles } from 'src/app/shared/core/models/app-roles';

@Component({
  selector: 'app-private-single-appointment',
  templateUrl: './private-single-appointment.component.html',
  styleUrls: ['./private-single-appointment.component.scss']
})
export class PrivateSingleAppointmentComponent extends SharedUtilityComponent implements OnInit {

  fonts = { faCalendar, faPlus, faGears };
  userSections = AppConstants.UserSections;
  currentSection = this.userSections.vitals;

  appointment?: AppAppointment;
  appointments: AppAppointment[] = [];
  appPagination = new AppPagination();
  filter = new AppointmentFilter();
  paginationRequest = new PaginationRequest<AppointmentFilter>(this.appPagination, this.filter);
  paginationResponse = new PaginationResponse<AppAppointment[]>();

  routes = ApplicationRoutes.generateRoutes();

  roles = AppRoles;

  constructor(
    private appointmentService: AppointmentService,
    private ticketService: TicketService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: CustomToastService,
    private modalService: NgbModal,
    private eventBus: EventBusService,
    ) {
    super();
  }

  override ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.filter.appointmentId = id;
    this.paginationRequest = new PaginationRequest<AppointmentFilter>(this.appPagination, this.filter);
    this.getAppointmentByDate();
  }

  getAppointmentByDate(): void {
    this.isLoading = true;
    const sub = this.appointmentService.getAppointmentsByDate(this.paginationRequest)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {

          if (data.totalItems <= 0) {
            this.toast.error('Appointment not found');
            this.router.navigate([this.routes.privateRoute.appointments().$absolutePath]);
            return;
          }

          this.paginationResponse = data;
          this.appointments = data.result ?? [];
          this.appointment = new AppAppointment(this.appointments[0]);
        },
        error: (error) => {
          throw error;
        }
      });
  }

  openAddNewTicket(type: string): void
  {
    const modalRef = this.modalService.open(PrivateCreateTicketModalComponent, { size: 'lg' });
    modalRef.componentInstance.type = type;
    modalRef.componentInstance.appointment = this.appointment;

    const sub = modalRef.componentInstance.saved.subscribe({
      next: () => {
        this.getAppointmentByDate();
      }
    });

    this.subscriptions.push(sub);
  }

  updateDoctor(): void {
    const modalRef = this.modalService.open(PrivateUpdateAppointmentModalComponent, { size: 'lg' });
    modalRef.componentInstance.appointment = this.appointment;
    modalRef.componentInstance.appointmentDate = null;

    const sub = modalRef.componentInstance.reload.subscribe({
      next: () => {
        this.getAppointmentByDate();
      }
    });

    this.subscriptions.push(sub);
  }

  confirmSendAllToDepartment(): void {
    const data = {
      title: 'Send all tickets',
      body: 'Are you sure you want to send all tickets to their respective departments. This cannot be undone',
      positiveBtn: 'Yes Send all',
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
          this.sendToDepartments();
        }
      }
    });
    this.subscriptions.push(sub);
  }

  private sendToDepartments(): void {
    this.isLoading = true;
    const sub = this.ticketService.sendAllTickets({ appointmentId : this.appointment?.base?.id})
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {
          this.toast.success('Tickets sent to their respective department');
          this.getAppointmentByDate();
        },
        error: (error)=> {
          throw error;
        }
      });

      this.subscriptions.push(sub);
  }
}
