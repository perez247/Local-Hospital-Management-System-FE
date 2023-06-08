import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { UserFilter } from "src/app/shared/core/models/app-user";
import { CustomErrorService } from "src/app/shared/services/common/custom-error/custom-error.service";
import { FilterCompaniesModalFunctions } from "./private-filter-companies-modal-functions";

@Component({
  selector: 'app-private-filter-companies-modal',
  templateUrl: './private-filter-companies-modal.component.html',
  styleUrls: ['./private-filter-companies-modal.component.scss']
})
export class PrivateFilterCompaniesModalComponent implements OnInit {

  @Input() public filter?: UserFilter;
  @Output() newFilter = new EventEmitter<UserFilter>();

  form: FormGroup = {} as any;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    public errorService: CustomErrorService,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.form = FilterCompaniesModalFunctions.createForm(this.fb, this.filter);
  }

  clearForm() {
    this.filter = new UserFilter('company');
    this.initializeForm();
  }

  addFilter() {
    this.newFilter.emit(this.form.value);
    this.activeModal.close();
  }

}
