import { AppAppointment } from 'src/app/shared/core/models/app-appointment';
import { FormBuilder, FormGroup } from "@angular/forms";
import { filter } from "rxjs";
import { CustomValidator } from "src/app/shared/validations/custom-validators";

export class PrivateUpdateAppointmentModalFunctions {
  public static createForm(fb: FormBuilder, appointment?: AppAppointment, appointmentDate?: Date): FormGroup
  {
    return fb.group({
      doctorName: [`${appointment?.doctor?.user?.lastName || ''} ${appointment?.doctor?.user?.firstName || ''}`.trim(), [CustomValidator.MaxLength(200)]],
      doctorId: [appointment?.doctor?.user?.base?.id || '', [CustomValidator.CustomRequired('Doctor Id')]],
      appointmentId: [appointment?.base?.id],
      appointmentDate: [appointmentDate],
    });
  }
}
