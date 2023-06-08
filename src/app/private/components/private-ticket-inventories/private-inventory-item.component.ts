import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { faCheckCircle, faClock, faPencilAlt, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { AppTicket, TicketInventory } from 'src/app/shared/core/models/app-ticket';
import { AppInventoryItem } from 'src/app/shared/core/models/inventory';

@Component({
  selector: 'app-private-inventory-item',
  templateUrl: './private-inventory-item.component.html'
})
export class PrivateInventoryItemComponent implements  OnInit, OnChanges {

  @Input() ticket: AppTicket = {} as AppTicket;
  @Input() ticketInventory: TicketInventory = {} as TicketInventory;
  @Input() inventoryItems: AppInventoryItem[] = [];

  @Output() recalculate = new EventEmitter();

  pricePerItem = 0;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (!this.ticket.cost){
      this.calculateItem();
    }
  }

  calculateItem(): void {
    if (this.inventoryItems.length <= 0) {
      this.setToDefault();
      return;
    }

    const item = this.inventoryItems.find(x => x?.inventory?.base?.id === this.ticketInventory.inventory.base?.id);

    if (!item) {
      this.setToDefault();
      return;
    }

    this.ticketInventory.pricePerItem = item?.pricePerItem ?? 0;
    this.ticketInventory.currentPrice = (this.ticketInventory.pricePerItem ?? 0) * (this.ticketInventory?.prescribedQuantity ?? 0);
    this.ticketInventory.totalPrice = (this.ticketInventory.pricePerItem ?? 0) * (this.ticketInventory?.prescribedQuantity ?? 0);
  }

  setToDefault(): void {
    this.ticketInventory.currentPrice = 0
    this.ticketInventory.totalPrice = 0
  }

}
