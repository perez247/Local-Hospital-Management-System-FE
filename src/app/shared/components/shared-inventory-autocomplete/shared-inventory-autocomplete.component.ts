import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { faWarehouse } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, finalize, Subject } from 'rxjs';
import { AppUser, UserFilter } from '../../core/models/app-user';
import { AppInventory, InventoryFilter } from '../../core/models/inventory';
import { AppPagination, PaginationRequest, PaginationResponse } from '../../core/models/pagination';
import { ApplicationRoutes } from '../../core/routes/app-routes';
import { InventoryService } from '../../services/api/inventory/inventory.service';
import { SharedUtilityComponent } from '../shared-utility/shared-utility.component';

@Component({
  selector: 'app-shared-inventory-autocomplete',
  templateUrl: './shared-inventory-autocomplete.component.html',
  styleUrls: ['./shared-inventory-autocomplete.component.scss']
})
export class SharedInventoryAutocompleteComponent extends SharedUtilityComponent implements OnInit {

  @Input() searchWord?: string;
  @Input() filter: InventoryFilter = new InventoryFilter();

  private subject$ = new Subject<string>();

  fonts = { faWarehouse }

  routes = ApplicationRoutes.generateRoutes();

  inventories: AppInventory[] = [];
  appPagination = new AppPagination();
  paginationRequest = new PaginationRequest<InventoryFilter>(this.appPagination, this.filter);
  paginationResponse = new PaginationResponse<any[]>();

  @ViewChild('myDrop') title: any;
  @Output() selected = new EventEmitter<AppInventory>();

  disableSearch = false;

  constructor(
    private modalService: NgbModal,
    private inventoryService: InventoryService
    ) {
    super();
  }

  override ngOnInit(): void {
    this.paginationRequest = new PaginationRequest<InventoryFilter>(this.appPagination, this.filter);
    this.checkForChanges();
  }


  ngOnChanges(changes: SimpleChanges): void {

    if (this.disableSearch) {
      return;
    }

    const currentWord = changes['searchWord']['currentValue'];
    this.subject$.next(currentWord)
  }


  checkForChanges(): void {
    const sub = this.subject$
    .pipe(
      debounceTime(1000),
      distinctUntilChanged()
      )
    .subscribe({
      next: (data) => {
        if (!data) { return; }
        if (data.length <= 2) { return; }
        this.filter.name = data;
        this.paginationRequest = new PaginationRequest<InventoryFilter>(this.appPagination, this.filter);
        this.getInventoryByName();
      }
    });

    this.subscriptions.push(sub);
  }

  getInventoryByName(): void {
    this.inventories = [];
    this.title.open();
    this.isLoading = true;
    const sub = this.inventoryService.getInventories(this.paginationRequest)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {
          this.paginationResponse = data;
          this.inventories = data.result ?? [];
          this.title.open();
        },
        error: (error) => {
          console.log(error);
        }
      });
    this.subscriptions.push(sub);
  }

  inventorySeletected(inventorySeletected: AppInventory): void {
    this.selected.emit(inventorySeletected);
    this.inventories = [];

    this.disableSearch = true;
    setTimeout(() => {
      this.disableSearch = false;
    }, 1000);
  }
}
