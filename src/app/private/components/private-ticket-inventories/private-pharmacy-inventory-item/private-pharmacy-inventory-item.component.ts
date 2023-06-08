import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { AppTicket, TicketInventory } from 'src/app/shared/core/models/app-ticket';
import { AppInventoryItem } from 'src/app/shared/core/models/inventory';
import { PrivateInventoryItemComponent } from '../private-inventory-item.component';

@Component({
  selector: 'app-private-pharmacy-inventory-item',
  templateUrl: './private-pharmacy-inventory-item.component.html',
  styleUrls: ['./private-pharmacy-inventory-item.component.scss']
})
export class PrivatePharmacyInventoryItemComponent extends PrivateInventoryItemComponent {

  constructor() {
    super();
  }

}
