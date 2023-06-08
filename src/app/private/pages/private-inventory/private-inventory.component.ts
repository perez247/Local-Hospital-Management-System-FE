import { Component, OnInit } from "@angular/core";
import { faWarehouse } from "@fortawesome/free-solid-svg-icons";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { finalize } from "rxjs";
import { SharedUtilityComponent } from "src/app/shared/components/shared-utility/shared-utility.component";
import { AppConstants } from "src/app/shared/core/models/app-constants";
import { AppRoles } from "src/app/shared/core/models/app-roles";
import { AppInventory, InventoryFilter } from "src/app/shared/core/models/inventory";
import { AppPagination, PaginationRequest, PaginationResponse } from "src/app/shared/core/models/pagination";
import { ApplicationRoutes } from "src/app/shared/core/routes/app-routes";
import { InventoryService } from "src/app/shared/services/api/inventory/inventory.service";
import { EventBusService } from "src/app/shared/services/common/event-bus/event-bus.service";
import { PrivateAddInventoryModalComponent } from "../../modals/private-add-inventory-modal/private-add-inventory-modal.component";
import { PrivateFilterInventoryModalComponent } from "../../modals/private-filter-inventory-modal/private-filter-inventory-modal.component";

@Component({
  selector: 'app-private-inventory',
  templateUrl: './private-inventory.component.html',
  styleUrls: ['./private-inventory.component.scss']
})
export class PrivateInventoryComponent extends SharedUtilityComponent implements OnInit {

  fonts = { faWarehouse }

  routes = ApplicationRoutes.generateRoutes();

  inventories: AppInventory[] = [];
  appPagination = new AppPagination();
  filter = new InventoryFilter();
  paginationRequest = new PaginationRequest<InventoryFilter>(this.appPagination, this.filter);
  paginationResponse = new PaginationResponse<any[]>();

  roles = AppRoles;

  ticketRoles: (string | undefined)[] = []
  lookupType = AppConstants.LookUpType;

  constructor(
    private modalService: NgbModal,
    private inventoryService: InventoryService,
    private eventBus: EventBusService
    ) {
    super();
  }

  override ngOnInit(): void {
    this.setTicketRoles();
    this.getInventories();
  }

  setTicketRoles(): void {
    this.ticketRoles = this.eventBus.getState().lookUps.value?.filter(x => x.type === this.lookupType.AppInventoryType).map(y => y.name) || [];
    this.ticketRoles?.push(this.roles.admin);
  }

  getInventories(): void {
    this.isLoading = true;
    const sub = this.inventoryService.getInventories(this.paginationRequest)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {
          this.paginationResponse = data;
          this.inventories = data.result ?? [];
        },
        error: (error) => {
          console.log(error);
        }
      });
    this.subscriptions.push(sub);
  }

  pageChanged(e: number) {
    this.appPagination.pageNumber = e;
    this.paginationRequest = new PaginationRequest<InventoryFilter>(this.appPagination, this.filter);
    this.getInventories();
  }

  openFilterInventory() {
    const modalRef = this.modalService.open(PrivateFilterInventoryModalComponent);
    const filter = { ...this.filter } as any;
    filter.appInventoryType = this.filter.appInventoryType && this.filter.appInventoryType.length > 0 ? this.filter.appInventoryType[0] : null;
    modalRef.componentInstance.filter = filter;

    const sub = modalRef.componentInstance.newFilter.subscribe({
      next: (filter: any) => {
        let newFilter = { ...filter } as any;
        newFilter.appInventoryType = filter.appInventoryType ? [filter.appInventoryType] : null;
        this.filter = newFilter;
        this.pageChanged(1);
      }
    });

    this.subscriptions.push(sub);
  }

  openAddInventoryModal() {
    this.modalService.open(PrivateAddInventoryModalComponent, { size: 'lg' });
  }

}
