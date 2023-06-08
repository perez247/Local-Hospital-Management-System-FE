import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal, NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { AppUser } from 'src/app/shared/core/models/app-user';
import { FinancialDebtFilter } from 'src/app/shared/core/models/financial';
import { CustomErrorService } from 'src/app/shared/services/common/custom-error/custom-error.service';
import { PrivateFilterFinanceDebtsModalFunctions } from './private-filter-finance-debts-modal-functions';

@Component({
  selector: 'app-private-filter-finance-debts-modal',
  templateUrl: './private-filter-finance-debts-modal.component.html',
  styleUrls: ['./private-filter-finance-debts-modal.component.scss']
})
export class PrivateFilterFinanceDebtsModalComponent implements OnInit {

  @Input() filter?: FinancialDebtFilter;
  @Output() newFilter = new EventEmitter<FinancialDebtFilter>();

  form: FormGroup = {} as any;

	hoveredDate: NgbDate | null = null;

	fromDate: NgbDate | null = null;
	toDate: NgbDate | null = null;

  fonts = { faCalendar };

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    public errorService: CustomErrorService,
    ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = PrivateFilterFinanceDebtsModalFunctions.createForm(this.fb, this.filter);
  }

  clear(id: string, otherId: string, otherName: string): void {
    this.form.patchValue({
      [id]: null,
      [otherId]: null,
      [otherName]: null,
    });
  }

  setCompany(company: AppUser) {
    this.form.patchValue({
      companyId: company.base?.id,
      companyName: company.firstName,
    });
  }

  setPatient(patient: AppUser) {
    this.form.patchValue({
      patientId: patient.base?.id,
      patientName: `${patient.lastName} ${patient.firstName}`,
    });
  }

  clearForm() {
    this.filter = new FinancialDebtFilter();
    this.initializeForm();
  }

  addFilter() {
    this.newFilter.emit(this.form.value);
    this.activeModal.close();
  }
}
