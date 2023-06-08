import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { faCheckCircle, faClock, faPencilAlt, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PrivateSaveLabRadiologyResultModalComponent } from 'src/app/private/modals/private-save-lab-radiology-result-modal/private-save-lab-radiology-result-modal.component';
import { AppTicket, TicketInventory } from 'src/app/shared/core/models/app-ticket';
import { AppInventoryItem } from 'src/app/shared/core/models/inventory';
import { PrivateInventoryItemComponent } from '../private-inventory-item.component';
import { PrivateAddItemUsedModalComponent } from 'src/app/private/modals/private-add-item-used-modal/private-add-item-used-modal.component';

@Component({
  selector: 'app-private-lab-inventory-item',
  templateUrl: './private-lab-inventory-item.component.html',
  styleUrls: ['./private-lab-inventory-item.component.scss']
})
export class PrivateLabInventoryItemComponent extends PrivateInventoryItemComponent {

  fonts = { faCheckCircle, faClock, faPencilAlt, faMagnifyingGlass };

  constructor(
    private modalService: NgbModal
  ) {
    super();
  }

  addResultModal(): void {
    const modalRef = this.modalService.open(PrivateSaveLabRadiologyResultModalComponent, { size: 'xl' });
    const component: PrivateSaveLabRadiologyResultModalComponent = modalRef.componentInstance;

    component.ticketInventory = this.ticketInventory;
    component.ticket = this.ticket;
  }

  addItemsUsed(): void {
    const modalRef = this.modalService.open(PrivateAddItemUsedModalComponent, { size: 'lg' });
    const component: PrivateAddItemUsedModalComponent = modalRef.componentInstance;

    component.ticketInventory = this.ticketInventory;
  }
}
