import { AppAppointment } from './../../../shared/core/models/app-appointment';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { finalize } from 'rxjs';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { AppConstants } from 'src/app/shared/core/models/app-constants';
import { AppRoles } from 'src/app/shared/core/models/app-roles';
import { AppUser, Patient } from 'src/app/shared/core/models/app-user';
import { PatientService } from 'src/app/shared/services/api/patient/patient.service';
import { CustomToastService } from 'src/app/shared/services/common/custom-toast/custom-toast.service';

@Component({
  selector: 'app-private-patient-allergies',
  templateUrl: './private-patient-allergies.component.html',
  styleUrls: ['./private-patient-allergies.component.scss']
})
export class PrivatePatientAllergiesComponent extends SharedUtilityComponent implements OnInit {

  @Input() appointment?: AppAppointment;
  @Output() reload = new EventEmitter<string>();
  @Input() isTodayAppointment? = true;

  @Input() patient?: Patient;

  allergies = '';

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '25rem',
    minHeight: '5rem',
  };

  userSections = AppConstants.UserSections;

  roles = AppRoles;
  doctor? = '';

  constructor(
    private patientService: PatientService,
    private toast: CustomToastService
  ) {
    super();
  }

  override ngOnInit(): void {
    this.doctor = this.appointment ? this.appointment.doctor?.user?.base?.id : this.roles.doctor;
    this.allergies = this.patient?.allergies ?? '';
  }

  update(): void {
    this.isLoading = true;
    const data = { patientId: this.patient?.base?.id, allergies: this.allergies }
    const sub = this.patientService.updateAllergies(data)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {
          this.reload.emit(this.userSections.allergies);
          this.toast.success('Allergies updated successfully');
        },
        error: (error) => {
          console.log(error);
        }
      });
    this.subscriptions.push(sub);
  }

}
