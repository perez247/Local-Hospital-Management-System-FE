import { Component, Input, OnInit } from '@angular/core';
import { faKitMedical, faNairaSign, faTrash, faPencil } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { AppRoles } from 'src/app/shared/core/models/app-roles';
import { AppInventory, AppInventoryItem, InventoryFilter, InventoryItemFilter } from 'src/app/shared/core/models/inventory';
import { AppPagination, PaginationRequest, PaginationResponse } from 'src/app/shared/core/models/pagination';
import { ApplicationRoutes } from 'src/app/shared/core/routes/app-routes';
import { InventoryService } from 'src/app/shared/services/api/inventory/inventory.service';
import { PrivateAddInventoryItemsModalComponent } from '../../modals/private-add-inventory-items-modal/private-add-inventory-items-modal.component';
import { PrivateFilterInventoryItemModalComponent } from '../../modals/private-filter-inventory-item-modal/private-filter-inventory-item-modal.component';

@Component({
  selector: 'app-private-inventory-items',
  templateUrl: './private-inventory-items.component.html',
  styleUrls: ['./private-inventory-items.component.scss']
})
export class PrivateInventoryItemsComponent extends SharedUtilityComponent implements OnInit {

  @Input() inventory?: AppInventory;

  fonts = { faKitMedical, faNairaSign, faTrash, faPencil }

  routes = ApplicationRoutes.generateRoutes();

  inventoryItems: AppInventoryItem[] = [];
  appPagination = new AppPagination();
  filter = new InventoryItemFilter();
  paginationRequest = new PaginationRequest<InventoryItemFilter>(this.appPagination, this.filter);
  paginationResponse = new PaginationResponse<any[]>();

  roles = AppRoles;

  constructor(
    private modalService: NgbModal,
    private inventoryService: InventoryService
    ) {
    super();
  }

  override ngOnInit(): void {
    this.filter.appInventoryId = this.inventory?.base?.id;
    this.paginationRequest = new PaginationRequest<InventoryItemFilter>(this.appPagination, this.filter);
    this.getInventories();
  }

  getInventories(): void {
    this.isLoading = true;
    const sub = this.inventoryService.getInventoryItems(this.paginationRequest)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {
          this.paginationResponse = data;
          this.inventoryItems = data.result ?? [];
        },
        error: (error) => {
          console.log(error);
        }
      });
    this.subscriptions.push(sub);
  }

  pageChanged(e: number) {
    this.appPagination.pageNumber = e;
    this.paginationRequest = new PaginationRequest<InventoryItemFilter>(this.appPagination, this.filter);
    this.getInventories();
  }

  saveInventoryItems(): void {
    const modalRef = this.modalService.open(PrivateAddInventoryItemsModalComponent, { size: 'lg' });
    modalRef.componentInstance.inventory = this.inventory;

    modalRef.componentInstance.list.subscribe({
      next: (data: any) => {
        this.beginSaveInventoryItems(data);
      }
    });
  }

  beginSaveInventoryItems(data: any): void
  {
    this.isLoading = true;
    const dataToSend = { inventoryId: this.inventory?.base?.id, inventoryItemRequests: data };
    const sub = this.inventoryService.saveInventoryItems(dataToSend)
      .pipe(finalize(() => this.isLoading = false ))
      .subscribe({
        next: (data) => {
          this.paginationRequest.pagination!.pageNumber = 1;
          this.getInventories()
        },
        error: (error) => {
          console.log(error);
        }
      });

    this.subscriptions.push(sub);
  }

  openFilterInventoryItems() {
    const modalRef = this.modalService.open(PrivateFilterInventoryItemModalComponent);
    modalRef.componentInstance.filter = this.filter;

    const sub = modalRef.componentInstance.newFilter.subscribe({
      next: (filter: InventoryItemFilter) => {
        this.filter = filter;
        this.pageChanged(1);
      }
    });

    this.subscriptions.push(sub);
  }

}
