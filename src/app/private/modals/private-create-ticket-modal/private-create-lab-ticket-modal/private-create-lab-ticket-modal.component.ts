import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { faTrashAlt, faPen, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { AppAppointment } from 'src/app/shared/core/models/app-appointment';
import { AppTicket, ITicketInventory, TicketFilter, AppTicketTypes } from 'src/app/shared/core/models/app-ticket';
import { InventoryFilter } from 'src/app/shared/core/models/inventory';
import { AppPagination, PaginationRequest, PaginationResponse } from 'src/app/shared/core/models/pagination';
import { TicketService } from 'src/app/shared/services/api/ticket/ticket.service';
import { CustomErrorService } from 'src/app/shared/services/common/custom-error/custom-error.service';
import { CustomToastService } from 'src/app/shared/services/common/custom-toast/custom-toast.service';
import { SharedCreateLabTicketFunctions } from './private-create-lab-ticket-functions';
import { PrivateGetInventoryModalComponent } from '../../private-get-inventory-modal/private-get-inventory-modal.component';

@Component({
  selector: 'app-private-create-lab-ticket-modal',
  templateUrl: './private-create-lab-ticket-modal.component.html',
  styleUrls: ['./private-create-lab-ticket-modal.component.scss']
})
export class PrivateCreateLabTicketModalComponent extends SharedUtilityComponent implements OnInit {

  @Input() ticket?: AppTicket;
  @Input() appointment?: AppAppointment;
  @Output() saved = new EventEmitter();
  @Input() ticketInventories: ITicketInventory[] = [];

  form: FormGroup = {} as any;

  filter: InventoryFilter = new InventoryFilter();

  fonts = { faTrashAlt, faPen, faPlusCircle };

  tickets: AppTicket[] = [];
  appPagination = new AppPagination();
  filterForTicket = new TicketFilter();
  paginationRequest = new PaginationRequest<TicketFilter>(this.appPagination, this.filterForTicket);
  paginationResponse = new PaginationResponse<AppTicket[]>();

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    public errorService: CustomErrorService,
    private tickerService: TicketService,
    private toast: CustomToastService,
    private modalService: NgbModal,
    private ticketService: TicketService,
    ) {
    super();
  }

  override ngOnInit(): void {
    if (this.ticket)
    {
      const id = this.ticket.base.id;
      this.filterForTicket.ticketId = id;
      this.filterForTicket.full = true;
      this.paginationRequest = new PaginationRequest<TicketFilter>(this.appPagination, this.filterForTicket);
      this.fetchTicket();
    } else {
      this.initializeForm();
    }
  }

  initializeForm(): void
  {
    this.filter.appInventoryType = [AppTicketTypes.lab];
    this.form = SharedCreateLabTicketFunctions.createForm(this.fb, this.ticket);
  }

  fetchTicket(): void {
    this.isLoading = true;
    const sub = this.ticketService.getTickets(this.paginationRequest)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {

          if (data.totalItems <= 0) {
            this.toast.error('Ticket not found');
            this.activeModal.close();
            return;
          }

          this.paginationResponse = data;
          this.tickets = data.result ?? [];
          this.ticket = this.tickets[0];
          this.ticketInventories = this.ticket.ticketInventories.map(x => {
            return { inventoryId: x.inventory.base?.id, inventoryName: x.inventory.name, doctorsPrescription: x.doctorsPrescription } as ITicketInventory
          });
          this.initializeForm();
        },
        error: (error) => {
          throw error;
        }
      });
    this.subscriptions.push(sub);
  }

  saveTicketInventory(appTicket: any)
  {
    const modalRef = this.modalService.open(PrivateGetInventoryModalComponent, { size: 'lg' });
    modalRef.componentInstance.appInventory = appTicket;
    modalRef.componentInstance.type = AppTicketTypes.lab;

    const sub = modalRef.componentInstance.itemSaved.subscribe({
      next: (data: ITicketInventory) => {
        this.addTicketInventory(data);
      }
    });
  }

  addTicketInventory(ticketInventory: ITicketInventory): void {
    const inventoryId = ticketInventory.inventoryId;

    const inventoryExists = this.ticketInventories.find(x => x.inventoryId === inventoryId);

    if (inventoryExists) {
      inventoryExists.doctorsPrescription = ticketInventory.doctorsPrescription;
      return;
    }

    this.ticketInventories.push(ticketInventory);
    this.form.patchValue({
      inventoryId: null,
      inventoryName: null,
      doctorsPrescription: null,
    });
  }


  removeTicketInventory(index: number): void {
    this.ticketInventories.splice(index, 1);
 }

 save(): void {
   const formData = this.form.value;
   const data = {
     ...formData,
     ticketInventories: this.ticketInventories,
     appointmentId: this.appointment?.base?.id,
   }

   this.isLoading = true;
   const sub = this.tickerService.saveTicketAndInventory(data)
     .pipe(finalize(() => this.isLoading = false))
     .subscribe({
       next: (data) => {
         this.toast.success("Pharmacy ticket and inventories created successfully");
         this.saved.emit();
         this.activeModal.close();
       },
       error: (error) => {
         this.errorService.setFormErrors(error, this.form);
       }
     });

   this.subscriptions.push(sub);
 }
}

