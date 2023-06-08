import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { faKitMedical, faNairaSign, faTrash, faPencil, faPlus, faLocationPin } from "@fortawesome/free-solid-svg-icons";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { AppUser } from "src/app/shared/core/models/app-user";
import { AppInventory } from "src/app/shared/core/models/inventory";
import { CustomErrorService } from "src/app/shared/services/common/custom-error/custom-error.service";

@Component({
  selector: 'app-private-add-inventory-items-modal',
  templateUrl: './private-add-inventory-items-modal.component.html',
  styleUrls: ['./private-add-inventory-items-modal.component.scss']
})
export class PrivateAddInventoryItemsModalComponent implements OnInit {

  @Input() inventory?: AppInventory;
  @Output() list = new EventEmitter();

  data: any[] = [];
  leadingForm: any = {} as any;
  default = true;

  fonts = { faKitMedical, faNairaSign, faTrash, faPencil, faPlus, faLocationPin }

  constructor(
    public activeModal: NgbActiveModal,
    public errorService: CustomErrorService
    ) { }

  ngOnInit(): void {
  }

  addFromSearchToLeading(company: AppUser): void {
    this.leadingForm.companyId = company.company?.base?.id;
    this.leadingForm.companyName = company.firstName;
  }

  addToData(): void {
    this.data.push(this.leadingForm);
    this.leadingForm = {};
  }

  removeItemInData(i: number): void {
    const d = this.data[i];
    if (d.default) {
      this.default = true;
    }
    this.data.splice(i, 1);
  }

  clearCompanyId(): void {
    this.leadingForm.companyId = null;
  }

  addDefault(): void {
    this.leadingForm.default = true;
    this.leadingForm.companyId = null;
    this.leadingForm.companyName = 'Default';
    this.default = false;
    this.data.push(this.leadingForm);
    this.leadingForm = {};
  }

  updateList(): void {
    this.list.emit(this.data);
    this.activeModal.close();
  }

}
