import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { AppUser, UserFilter } from 'src/app/shared/core/models/app-user';
import { faHeartPulse } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppConstants } from 'src/app/shared/core/models/app-constants';
import { PatientService } from 'src/app/shared/services/api/patient/patient.service';
import { finalize } from 'rxjs';
import { AppPagination, PaginationRequest, PaginationResponse } from 'src/app/shared/core/models/pagination';
import { PatientVital, PatientVitalFilter } from 'src/app/shared/core/models/patient';
import { PrivateAddViewPatientVitalModalComponent } from '../../modals/private-add-view-patient-vital-modal/private-add-view-patient-vital-modal.component';
import { AppRoles } from 'src/app/shared/core/models/app-roles';

@Component({
  selector: 'app-private-patient-vitals',
  templateUrl: './private-patient-vitals.component.html',
  styleUrls: ['./private-patient-vitals.component.scss']
})
export class PrivatePatientVitalsComponent extends SharedUtilityComponent implements OnInit {

  @Output() reload = new EventEmitter<string>();

  @Input() user?: AppUser;
  @Input() isTodayAppointment? = true;

  fonts = { faHeartPulse };

  userSections = AppConstants.UserSections;

  vitals: PatientVital[] = [];
  appPagination = new AppPagination();
  filter = new PatientVitalFilter();
  paginationRequest = new PaginationRequest<PatientVitalFilter>(this.appPagination, this.filter);
  paginationResponse = new PaginationResponse<PatientVital[]>();

  roles = AppRoles;

  constructor(
    private modalService: NgbModal,
    private patientService: PatientService,
  ) {
    super();
  }

  override ngOnInit(): void {
    this.filter.patientId = this.user?.patient?.base?.id;
    this.paginationRequest = new PaginationRequest<PatientVitalFilter>(this.appPagination, this.filter);
    this.getPatientVitals();
  }

  openAddVitalModal(): void {
    const modalRef = this.modalService.open(PrivateAddViewPatientVitalModalComponent, { size: 'lg' });
    modalRef.componentInstance.patientId = this.user?.patient?.base?.id;
    const sub = modalRef.componentInstance.vitalAdded.subscribe({
      next: () => {
        this.reload.emit(this.userSections.vitals);
        console.log('refresh vitals')
      }
    });
    this.subscriptions.push(sub);
  }

  getPatientVitals(): void {
    this.isLoading = true;
    const sub = this.patientService.getVitals(this.paginationRequest)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {
          this.paginationResponse = data;
          this.vitals = data.result ?? [];
        },
        error: (data) => {
          console.log(data);
        }
      });

      this.subscriptions.push(sub);
  }

  pageChanged(e: number) {
    this.appPagination.pageNumber = e;
    this.paginationRequest = new PaginationRequest<UserFilter>(this.appPagination, this.filter);
    this.getPatientVitals();
  }

  viewVital(vital: PatientVital) {
    const modalRef = this.modalService.open(PrivateAddViewPatientVitalModalComponent, { size: 'lg' });
    modalRef.componentInstance.patientVital = vital;
  }
}
