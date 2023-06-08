import { Component, Input } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppTicket, TicketInventory } from 'src/app/shared/core/models/app-ticket';

@Component({
  selector: 'app-private-save-lab-radiology-result-modal',
  templateUrl: './private-save-lab-radiology-result-modal.component.html',
  styleUrls: ['./private-save-lab-radiology-result-modal.component.scss']
})
export class PrivateSaveLabRadiologyResultModalComponent {

  @Input() ticket: AppTicket = {} as AppTicket;
  @Input() ticketInventory: TicketInventory = {} as TicketInventory;

  constructor(
    public activeModal: NgbActiveModal,
  ) { }

  save(): void {
    this.activeModal.close();
  }

}
