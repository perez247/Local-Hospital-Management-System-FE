import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { faCalendarCheck, faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarMonthViewDay, CalendarView } from 'angular-calendar';
import * as moment from 'moment';
import { finalize } from 'rxjs';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { AppointmentFilter } from 'src/app/shared/core/models/app-appointment';
import { ApplicationRoutes } from 'src/app/shared/core/routes/app-routes';
import { AppointmentService } from 'src/app/shared/services/api/appointment/appointment.service';
import { PrivateViewAppointmentsByDateModalComponent } from '../../modals/private-view-appointments-by-date-modal/private-view-appointments-by-date-modal.component';

@Component({
  selector: 'app-private-appointments-by-calendar',
  templateUrl: './private-appointments-by-calendar.component.html',
  styleUrls: ['./private-appointments-by-calendar.component.scss']
})
export class PrivateAppointmentsByCalendarComponent extends SharedUtilityComponent implements OnInit, OnChanges {

  @Input() filter = new AppointmentFilter();

  fonts = { faCalendarCheck, faChevronCircleLeft, faChevronCircleRight }
  viewDate: Date = moment().toDate();
  events: CalendarEvent<{ total?: number }>[] = [];
  view: CalendarView = CalendarView.Month;
  totalForMonth = 0;

  routes = ApplicationRoutes.generateRoutes();

  constructor(
    private appointmentService: AppointmentService,
    private modalService: NgbModal
  ) {
    super();
  }

  override ngOnInit(): void {
    // this.getAppointmentCountByDate();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getAppointmentCountByDate();
  }

  getAppointmentCountByDate(): void {
    this.isLoading = true;
    const sub = this.appointmentService.getAppointmentsCountByMonth({ date: this.viewDate, doctorId: this.filter.doctorId, patientId: this.filter.patientId })
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {
          this.events = [];
          this.totalForMonth = 0;
          data.forEach(a => {

            this.totalForMonth += a.total ?? 0;
            const localDate = moment(a.appointmentDate);

            this.events.push({
                title: `Total appointments on ${localDate.format('DD/MMM/YYYY')} : ${a.total}`,
                start: localDate.toDate(),
                meta: {
                  total: a.total,
                },
            })
          });
        },
        error: (error) => {
          console.log(error);
        }
      });
    this.subscriptions.push(sub);
  }

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach((day) => {
      day.badgeTotal = day.events.reduce((partialSum, a) => partialSum + a.meta.total, 0);
    });
  }

  dayClicked(event: any): void {
    const modalRef = this.modalService.open(PrivateViewAppointmentsByDateModalComponent, { size: 'lg' })
    modalRef.componentInstance.appointmentDate = new Date(event.day.date);
    modalRef.componentInstance.pageSize = event.day.badgeTotal;
  }

}
