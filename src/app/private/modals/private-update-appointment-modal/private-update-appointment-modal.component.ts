import { CustomToastService } from 'src/app/shared/services/common/custom-toast/custom-toast.service';
import { finalize } from 'rxjs';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { AppointmentService } from 'src/app/shared/services/api/appointment/appointment.service';
import { AppAppointment } from 'src/app/shared/core/models/app-appointment';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PrivateUpdateAppointmentModalFunctions } from './private-update-appointment-modal-functions';
import { AppUser } from 'src/app/shared/core/models/app-user';
import { CustomErrorService } from 'src/app/shared/services/common/custom-error/custom-error.service';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { AppRoles } from 'src/app/shared/core/models/app-roles';

@Component({
  selector: 'app-private-update-appointment-modal',
  templateUrl: './private-update-appointment-modal.component.html',
  styleUrls: ['./private-update-appointment-modal.component.scss']
})
export class PrivateUpdateAppointmentModalComponent extends SharedUtilityComponent implements OnInit {

  @Input() appointment?: AppAppointment;
  @Input() appointmentDate?: Date;

  @Output() reload = new EventEmitter();

  form: FormGroup = {} as any;

  roles = AppRoles;

  fonts = { faCalendar }

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    public errorService: CustomErrorService,
    private toast: CustomToastService,
    ) {
    super();
  }

  override ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.form = PrivateUpdateAppointmentModalFunctions.createForm(this.fb, this.appointment, this.appointmentDate);
  }

  updateFormFromAutoComplete(staff: AppUser): void {
    this.form.patchValue({
      doctorId: staff.staff?.base?.id,
      doctorName: `${staff.lastName} ${staff.firstName}`
    });
  }

  clearDoctor(): void {
    this.form.patchValue({
      doctorId: null,
    });
  }

  updateAppointment(): void {
    this.isLoading = true;
    const sub = this.appointmentService.updateAppointment(this.form.value)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: () => {
          this.reload.emit();
          this.toast.success(`Appointment updated successfully`);
          this.activeModal.close();
        },
        error: (error) => {
          throw error;
        }
      });
      this.subscriptions.push(sub);
  }

}
