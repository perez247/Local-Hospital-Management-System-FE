import { AppInventory } from 'src/app/shared/core/models/inventory';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { InventoryService } from 'src/app/shared/services/api/inventory/inventory.service';
import { CustomToastService } from 'src/app/shared/services/common/custom-toast/custom-toast.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faRotate } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-private-inventory-dependencies',
  templateUrl: './private-inventory-dependencies.component.html',
  styleUrls: ['./private-inventory-dependencies.component.scss']
})
export class PrivateInventoryDependenciesComponent extends SharedUtilityComponent implements OnInit {

  @Input() inventory?: AppInventory;
  @Output() reload = new EventEmitter();

  fonts = { faRotate };

  constructor(
    private modalService: NgbModal,
    private inventoryService: InventoryService,
    private toast: CustomToastService,
    ) {
    super();
  }

  override ngOnInit(): void {
  }

}
