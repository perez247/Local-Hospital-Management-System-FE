import { EventBusService } from './../../../shared/services/common/event-bus/event-bus.service';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { Component, OnInit } from '@angular/core';
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentFilter } from 'src/app/shared/core/models/app-appointment';
import { PrivateCreatePatientAppointmentModalComponent } from '../../modals/private-create-patient-appointment-modal/private-create-patient-appointment-modal.component';
import { PrivateFilterAppointmentsModalComponent } from '../../modals/private-filter-appointments-modal/private-filter-appointments-modal.component';
import { AppRoles } from 'src/app/shared/core/models/app-roles';

@Component({
  selector: 'app-private-appointments',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './private-appointments.component.html',
  styleUrls: ['./private-appointments.component.scss']
})
export class PrivateAppointmentsComponent extends SharedUtilityComponent implements OnInit {

  fonts = { faCalendarCheck }

  displayCalendar = true;

  appointmentDate?: Date = new Date();
  filter = new AppointmentFilter();

  roles = AppRoles;

  constructor(
    private modalService: NgbModal,
    private eventBus: EventBusService
  ) {
    super();
  }

  override ngOnInit(): void {
    this.updateFilterDoctor();
    this.filter.startDate = `${this.appointmentDate?.getFullYear()}-${(this.appointmentDate?.getMonth() ?? 0) + 1}-${this.appointmentDate?.getDate()}`;
  }

  updateFilterDoctor(): void {
    const user = this.eventBus.getState().user.value;
    const hasDoctor = user?.userRoles?.find(x => x === this.roles.doctor);
    if (hasDoctor) {
      this.filter.doctorId = user?.staff?.base?.id,
      this.filter.doctorName = `${user?.lastName} ${user?.firstName} ${user?.otherName}`
    }
  }

  openAddPatientAppointmentModal(): void {
    this.modalService.open(PrivateCreatePatientAppointmentModalComponent, { size: 'lg' });
  }

  openFilterAppointment(): void {
    const modalRef = this.modalService.open(PrivateFilterAppointmentsModalComponent, { size: 'lg' });
    modalRef.componentInstance.filter = this.filter;

    const sub = modalRef.componentInstance.newFilter.subscribe({
      next: (filter: AppointmentFilter) => {
        this.filter = filter;
      }
    });
    this.subscriptions.push(sub);
  }
}
