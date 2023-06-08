import { CustomToastService } from 'src/app/shared/services/common/custom-toast/custom-toast.service';
import { finalize } from 'rxjs';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentService } from 'src/app/shared/services/api/appointment/appointment.service';
import { AppAppointment } from 'src/app/shared/core/models/app-appointment';
import { Component, Input, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AppRoles } from 'src/app/shared/core/models/app-roles';

@Component({
  selector: 'app-private-appointment-overall-description',
  templateUrl: './private-appointment-overall-description.component.html',
  styleUrls: ['./private-appointment-overall-description.component.scss']
})
export class PrivateAppointmentOverallDescriptionComponent extends SharedUtilityComponent implements OnInit {

  @Input() appointment?: AppAppointment;
  @Input() canEdit?: boolean;
  @Input() isTodayAppointment? = true;

  editableDescription? = '';

  editorConfig: AngularEditorConfig = {
    editable: !this.canEdit,
    spellcheck: true,
    height: '25rem',
    minHeight: '5rem',
  };

  roles = AppRoles;

  constructor(
    private appointmentService: AppointmentService,
    private modalService: NgbModal,
    private toast: CustomToastService,
  ) {
    super();
  }

  override ngOnInit(): void {
    this.appointment!.overallDescription = this.appointment?.overallDescription ?? '';
    this.editableDescription = this.appointment?.overallDescription;
  }

  saveOverallDescription(): void {
    this.isLoading = true;
    const data = {
      appointmentId : this.appointment?.base?.id,
      doctorId: this.appointment?.doctor?.base?.id,
      overallDescription : this.editableDescription
    }

    const sub = this.appointmentService.updateAppointment(data)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next:(data) => {
          this.appointment!.overallDescription = this.editableDescription;
          this.toast.success('Description updated successfully');
        },
        error: (error) => {
          this.editableDescription = this.appointment?.overallDescription;
          throw error;
        }
      });

    this.subscriptions.push(sub);

  }

}
