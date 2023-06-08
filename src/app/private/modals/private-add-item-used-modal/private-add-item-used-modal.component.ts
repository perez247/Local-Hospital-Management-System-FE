import { Component, Input, OnInit } from '@angular/core';
import { faKitMedical, faNairaSign, faTrash, faPencil, faPlus, faLocationPin } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppTicketTypes, TicketInventory } from 'src/app/shared/core/models/app-ticket';
import { AppInventory, InventoryFilter } from 'src/app/shared/core/models/inventory';
import { CustomErrorService } from 'src/app/shared/services/common/custom-error/custom-error.service';

@Component({
  selector: 'app-private-add-item-used-modal',
  templateUrl: './private-add-item-used-modal.component.html',
  styleUrls: ['./private-add-item-used-modal.component.scss']
})
export class PrivateAddItemUsedModalComponent implements OnInit {

  @Input() ticketInventory: TicketInventory = {} as TicketInventory;

  leadingForm: AppInventory = {} as AppInventory;

  fonts = { faKitMedical, faNairaSign, faTrash, faPencil, faPlus, faLocationPin }

  filter: InventoryFilter = new InventoryFilter();

  constructor(
    public activeModal: NgbActiveModal,
    public errorService: CustomErrorService
    ) { }

  ngOnInit(): void {
    this.filter.appInventoryType = [ AppTicketTypes.pharmacy ];
    if (!this.ticketInventory.itemsUsed) {
      this.ticketInventory.itemsUsed = [];
    }
  }

  addFromSearchToLeading(inventory: AppInventory): void {
    this.leadingForm = inventory;
    this.leadingForm!.id = this.leadingForm?.base?.id;
  }

  addToData(): void {
    this.ticketInventory.itemsUsed.push(this.leadingForm ?? {});
    this.leadingForm = {};
  }

  removeItemInData(i: number): void {
    this.ticketInventory.itemsUsed.splice(i, 1);
  }

  clearInventory(): void {
    this.leadingForm!.id = undefined;
  }

}
