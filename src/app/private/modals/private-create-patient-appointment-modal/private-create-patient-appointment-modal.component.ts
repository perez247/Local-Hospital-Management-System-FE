import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { faCalendar, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment";
import { finalize } from "rxjs";
import { SharedUtilityComponent } from "src/app/shared/components/shared-utility/shared-utility.component";
import { AppUser } from "src/app/shared/core/models/app-user";
import { ApplicationRoutes } from "src/app/shared/core/routes/app-routes";
import { AppointmentService } from "src/app/shared/services/api/appointment/appointment.service";
import { AppFileService } from "src/app/shared/services/common/app-file/app-file.service";
import { CustomErrorService } from "src/app/shared/services/common/custom-error/custom-error.service";
import { CustomToastService } from "src/app/shared/services/common/custom-toast/custom-toast.service";
import { CreatePatientAppoitmentModalFunctions } from "./private-create-patient-appointment-modal-functions";

@Component({
  selector: 'app-private-create-patient-appointment-modal',
  templateUrl: './private-create-patient-appointment-modal.component.html',
  styleUrls: ['./private-create-patient-appointment-modal.component.scss'],
})
export class PrivateCreatePatientAppointmentModalComponent extends SharedUtilityComponent implements OnInit {

  form: FormGroup = {} as any;
  routes = ApplicationRoutes.generateRoutes();

  fonts = { faCalendar, faTrashAlt }

  hour?: number = 0;
  minute?: number = 0;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    public errorService: CustomErrorService,
    private appointmentService: AppointmentService,
    private router: Router,
    private toast: CustomToastService,
    private appFileService: AppFileService
  ) {
    super();
  }

  override ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = CreatePatientAppoitmentModalFunctions.createForm(this.fb);
  }

  addPatient(patient: AppUser): void {
    this.form.patchValue({
      patientId: patient.patient?.base?.id,
      patientName: `${patient.lastName} ${patient.firstName} ${patient.otherName}`,
    });
  }

  clearpatient(): void {
    this.form.patchValue({
      patientId: null
    });
  }

  addDoctor(doctor: AppUser): void {
    this.form.patchValue({
      doctorId: doctor.staff?.base?.id,
      doctorName: `${doctor.lastName} ${doctor.firstName} ${doctor.otherName}`,
    });
  }

  clearDoctor(): void {
    this.form.patchValue({
      doctorId: null
    });
  }

  addTime(): void {
    const dateAsString = this.form.get('appointmentDate')?.value;

    if (!dateAsString) { return; }

    let date = moment(dateAsString);

    if (!date.isValid()) { return; }

    date = date.add(this.hour, 'hour').add(this.minute, 'minutes');

    this.form.patchValue({
      appointmentDate: date.toDate()
    })

  }

  createPatientAppointment(): void {
    this.isLoading = true;
    const data = this.form.value;
    let d = {...data};
    const appointmentDate = moment(d.appointmentDate).toDate();
    appointmentDate.setHours(d.appointmentTime.hour);
    appointmentDate.setMinutes(d.appointmentTime.minute);

    d.appointmentDate = appointmentDate;
    const sub = this.appointmentService.createPatientAppointment(d)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data: any) => {

          if (data.password && data.password.length > 2) {
            this.appFileService.downloadAsCSV(data, 'user_credentials.csv');
          }
          this.toast.success("Patient Appointment created successfully");
          this.router.navigate([`/`+ this.routes.privateRoute.single_appointment(data.appointmentId).$absolutePath]);
          this.activeModal.close();
        },
        error: (error) => {
          console.log(error);
        }
      });

    this.subscriptions.push(sub);
  }

}
