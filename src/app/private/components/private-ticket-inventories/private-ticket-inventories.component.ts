import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { ILookUp, AppConstants } from 'src/app/shared/core/models/app-constants';
import { AppRoles } from 'src/app/shared/core/models/app-roles';
import { AppTicket, AppTicketTypes, TicketInventory, TicketInventoryFilter } from 'src/app/shared/core/models/app-ticket';
import { Company } from 'src/app/shared/core/models/app-user';
import { AppInventoryItem } from 'src/app/shared/core/models/inventory';
import { Confirmable } from 'src/app/shared/decorators/confirm-action-method-decorator';
import { InventoryService } from 'src/app/shared/services/api/inventory/inventory.service';
import { TicketService } from 'src/app/shared/services/api/ticket/ticket.service';
import { UserService } from 'src/app/shared/services/api/user/user.service';
import { CustomToastService } from 'src/app/shared/services/common/custom-toast/custom-toast.service';
import { EventBusService } from 'src/app/shared/services/common/event-bus/event-bus.service';
import { PrivateMakeInitialPaymentComponent } from '../../modals/private-make-initial-payment/private-make-initial-payment.component';
import { AppPagination, PaginationContext } from 'src/app/shared/core/models/pagination';
import { FinancialService } from 'src/app/shared/services/api/financial/financial.service';
import { faNairaSign } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-private-ticket-inventories',
  templateUrl: './private-ticket-inventories.component.html',
  styleUrls: ['./private-ticket-inventories.component.scss']
})
export class PrivateTicketInventoriesComponent extends SharedUtilityComponent implements OnInit {

  @Input() ticket: AppTicket = {} as AppTicket;
  @Output() reload = new EventEmitter<string>();

  appStatuses: ILookUp[] = [];
  userSections = AppConstants.UserSections;

  companies: Company[] = [];
  selectedCompany = null;
  selectedCompanyObject: Company = {} as Company;

  inventoryItems: AppInventoryItem[] = [];

  sumTotal = 0;
  fonts = { faNairaSign }

  roles = AppRoles;
  types = AppTicketTypes;

  pagination = new PaginationContext<TicketInventory, TicketInventoryFilter>()

  constructor(
    private ticketService: TicketService,
    private inventoryService: InventoryService,
    private userService: UserService,
    private toast: CustomToastService,
    private eventBus: EventBusService,
    private modalService: NgbModal,
    private financialService: FinancialService,
  ) {
    super();
  }

  override ngOnInit(): void {
    this.appStatuses = this.eventBus.getState().lookUps.value?.filter(x => x.type === AppConstants.LookUpType.AppTicketStatus) ?? [];
    this.getIndividualCompany();

    this.pagination.request?.setFilter({ appTicketId: this.ticket?.base?.id, isTickets: true });

    this.getTicketInventory();
  }

  getIndividualCompany(): void {
    if (!this.ticket.sentToFinance) { return; }
    this.isLoading = true;
    const sub = this.userService.getIndividualCompany()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {
          this.companies = [];
          const user = data.result ? data.result[0] : null;
          const company = user?.company;
          if (company && company.base?.id != this.ticket.patient.company?.base?.id) {
            this.companies.push(company);
          }
          this.companies.push(this.ticket?.patient?.company ?? {});
        }
      });
    this.subscriptions.push(sub);
  }

  getTicketInventory(): void {
    this.isLoading = true;
    const sub = this.inventoryService.getTicketInventories(this.pagination.request)
      .pipe(finalize(() => this.isLoading = false ))
      .subscribe({
        next: (data) => {
          this.pagination.setResponse(data, false);
          this.pagination.elements.forEach(x => {
            if (Number(x.prescribedQuantity) <= 0) {
              x.prescribedQuantity = 1;
            }
          });
        },
        error: (error) => {
          throw error;
        }
      });

    this.subscriptions.push(sub);
  }

  @Confirmable({
    title: 'Send to finance',
    html: 'Are you sure you want to send to finance. This cannot be undone'
  })
  sendToFinance(): void {

    if (!this.areQuantitiesValid()) { return; }

    const data = {
      ticketId: this.ticket?.base.id
    }

    this.isLoading = true;

    const sub = this.ticketService.sendTicketsToFinance(data)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {
          this.toast.success('Ticket sent to the finance department')
          this.reload.emit(this.userSections.ticketList);
        },
        error: (error) => {
          throw error;
        }
      });

    this.subscriptions.push(sub);
  }

  areQuantitiesValid(): boolean {
    let valid = true;
    for (const iterator of this.pagination.elements ?? []) {

      if ((!iterator.prescribedQuantity || iterator.prescribedQuantity <= 0) && iterator.appTicketStatus != 'canceled') {
        this.toast.error(`"${iterator.inventory.name}" must have quantity greater than 0`);
        valid = false;
        break;
      }

      if ((iterator.prescribedQuantity ?? 0) > (iterator.inventory.quantity ?? 0)) {
        this.toast.error(`"${iterator.inventory.name}" does not have enough available quantity`);
        valid = false;
        break;
      }
    }

    if (this.ticket.sentToFinance && !this.selectedCompany) {
      this.toast.error(`Kindly select a payer`);
      return false;
    }

    return valid;
  }

  calculateNewTotal(selected: any): void
  {
    this.selectedCompany = selected.target.value;

    if (!this.selectedCompany || this.selectedCompany == 'null') {
      this.inventoryItems = [];
      this.selectedCompanyObject = {};
      this.sumTotal = 0;
      return;
    }

    const data = {
      companyId: this.selectedCompany,
      appInventories: this.pagination.elements.map(x => {
        return {
          appInventoryId: x.inventory.base?.id
        }
      }),
    }

    this.isLoading = true;
    const sub = this.inventoryService.getInventoryItemPrices(data)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {
          this.selectedCompanyObject = this.companies.find(x => x.base?.id === this.selectedCompany) ?? {};
          this.inventoryItems = data;
          this.getFullTotal();
        },
        error: (error) => {
          this.inventoryItems = [];
          throw error;
        }
      });

    this.subscriptions.push(sub);
  }

  private getFullTotal(): void {
    const data = {
      companyId: this.selectedCompanyObject.base?.id,
      appTicketId: this.ticket.base.id
    };

    const sub = this.financialService.getBillTotal(data)
    .pipe(finalize(() => this.isLoading = false))
    .subscribe({
      next: (total) => {
        this.sumTotal = total;
      },
      error: (error) => {
        throw error;
      }
    });

    this.subscriptions.push(sub);
  }

  makeInitialPayment(): void {

    const ticketInventories = this.pagination.elements.filter(x => x.appTicketStatus === 'ongoing');

    if (!this.areQuantitiesValid()) { return; }
    if (ticketInventories.length <= 0) {
      this.toast.error('At least one item should be ongoing');
      return;
    }

    const modalRef = this.modalService.open(PrivateMakeInitialPaymentComponent, { size: 'xl' });
    modalRef.componentInstance.ticket = this.ticket;
    modalRef.componentInstance.inventoryItems = this.inventoryItems;
    modalRef.componentInstance.payee = this.selectedCompanyObject;

    const sub = modalRef.componentInstance.reload.subscribe({
      next: () => {
        this.reload.emit(this.userSections.ticketList);
      },
      error: (error: any) => {
        throw error;
      }
    });

    this.subscriptions.push(sub);
  }

  @Confirmable({
    title: 'Bill Client',
    html: 'Are you sure you want to conclude the ticket, this means service has been redendered it cannot be undone'
  })
  billClient(): void {
    if (!this.selectedCompany) {
      this.toast.error('Payer not yet selected');
      return;
    }

    const data = { companyId: this.selectedCompany, appTicketId: this.ticket.base.id }

    this.isLoading = true;
    const sub = this.financialService.billClient(data)
                    .pipe(finalize(() => this.isLoading = false))
                    .subscribe({
                      next: () => {
                        this.reload.emit(this.userSections.ticketList);
                      },
                      error: (error) => {
                        throw error;
                      }
                    });

    this.subscriptions.push(sub);

  }

  @Confirmable({
    title: 'Conclude ticket',
    html: 'Are you sure you want to conclude the ticket, this means service has been redendered it cannot be undone'
  })
  concludeTicket(): void {
    const data = {
      ticketId: this.ticket.base.id,
      concludeTicketRequest: this.pagination.elements.map(x => {
        return {
          inventoryId : x.base.id,
          concludedDate: new Date(),
          appTicketStatus: x.appTicketStatus === 'canceled' ? x.appTicketStatus : 'concluded',
          labRadiologyTestResult: x.labRadiologyTestResult,
          surgeryTestResult: x.surgeryTestResult,
          itemsUsed : x.itemsUsed,
          proof: x.proof,
          totalPrice: x.totalPrice,
          admissionEndDate: x.admissionEndDate
        }
      }),
    }

    this.isLoading = true;

    let inventoryType = this.setInventory();

    const sub = this.ticketService.concludeTicket(data, inventoryType)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: () => {
          this.toast.success('Ticket has been concluded successfully');
          this.reload.emit(this.userSections.ticketList);
        },
        error: (error: any) => {
          throw error;
        }
      });

    this.subscriptions.push(sub);
  }

  private setInventory(): string
  {
    let inventoryType = this.ticket.appInventoryType;

    switch (inventoryType) {
      case AppTicketTypes.radiology:
      // case AppTicketTypes.surgery:
        inventoryType = AppTicketTypes.lab;
        break;
      default:
        break;
    }

    return inventoryType;
  }

  pageChanged(e: number) {
    this.pagination.request?.setPagination({ pageNumber: e });
    this.getTicketInventory();
  }
}


