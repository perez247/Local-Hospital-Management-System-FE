import { TicketFilter } from 'src/app/shared/core/models/app-ticket';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppConstants, ILookUp } from 'src/app/shared/core/models/app-constants';
import { CustomErrorService } from 'src/app/shared/services/common/custom-error/custom-error.service';
import { EventBusService } from 'src/app/shared/services/common/event-bus/event-bus.service';
import { PrivateFilterTicketsModalFunctions } from './private-filter-tickets-functions';
import { AppUser } from 'src/app/shared/core/models/app-user';

@Component({
  selector: 'app-private-filter-tickets',
  templateUrl: './private-filter-tickets.component.html',
  styleUrls: ['./private-filter-tickets.component.scss']
})
export class PrivateFilterTicketsComponent implements OnInit {

  @Input() filter?: TicketFilter;
  @Input() keepState?: any = {};
  @Output() newFilter = new EventEmitter<TicketFilter>();

  appStatuses: ILookUp[] = [];
  appInventoryTypes: ILookUp[] = [];
  form: FormGroup = {} as any;

  isAdmin = false;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    public errorService: CustomErrorService,
    private eventBus: EventBusService,
    ) { }

  ngOnInit(): void {
    this.appStatuses = this.eventBus.getState().lookUps.value?.filter(x => x.type === AppConstants.LookUpType.AppTicketStatus) ?? [];
    this.appInventoryTypes = this.eventBus.getState().lookUps.value?.filter(x => x.type === AppConstants.LookUpType.AppInventoryType) ?? [];
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = PrivateFilterTicketsModalFunctions.createForm(this.fb, this.filter);
  }

  setPatient(patient: AppUser): void {
    this.form.patchValue({
      patientId: patient.base?.id,
      patientName: `${patient.lastName} ${patient.firstName}`,
    });
  }

  setDoctor(doctor: AppUser): void {
    this.form.patchValue({
      doctorId: doctor.base?.id,
      doctorName: `${doctor.lastName} ${doctor.firstName}`,
    });
  }

  clear(propertyName: string): void {
    this.form.patchValue({
      [propertyName]: null,
    });
  }

  clearForm(): void {
    this.filter = new TicketFilter();
    const data = this.keepState;
    this.filter = { ...data  };
    this.initializeForm();
  }

  addFilter(): void {
    this.newFilter.emit(this.form.value);
    this.activeModal.close();
  }

}
