import { FormGroup, FormBuilder } from '@angular/forms';
import { CustomErrorService } from 'src/app/shared/services/common/custom-error/custom-error.service';
import { ILookUp } from 'src/app/shared/core/models/app-constants';
import { EventBusService } from 'src/app/shared/services/common/event-bus/event-bus.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faDownload, faFileAlt, faTrash, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as saveAs from 'file-saver';
import { IFileStatus, UtilityHelpers } from 'src/app/shared/core/functions/utility-helpers';
import { FileUpload } from '../private-upload-files-modal/private-upload-files-modal.component';
import { AppConstants } from 'src/app/shared/core/models/app-constants';
import { PaymentMade } from 'src/app/shared/core/models/payment-made-model';
import { AddPaymentModelView } from 'src/app/shared/core/model-view/add-payment-model-view';


@Component({
  selector: 'app-private-add-payment-modal',
  templateUrl: './private-add-payment-modal.component.html',
  styleUrls: ['./private-add-payment-modal.component.scss']
})
export class PrivateAddPaymentModalComponent implements OnInit {

  @Input() cost?: number;
  @Output() newPayment = new EventEmitter<PaymentMade>();

  fonts = { faFileAlt, faTrashAlt, faDownload, faTrash }

  public viewModel: AddPaymentModelView = {} as AddPaymentModelView;

  constructor(
    public activeModal: NgbActiveModal,
    private eventBus: EventBusService,
    public errorService: CustomErrorService,
    private fb: FormBuilder
  ) {
    this.viewModel = new AddPaymentModelView(this.eventBus, this.fb);
  }

  ngOnInit(): void {}

  fileChangeEvent(event: any): void {
    const file = event.target.files[0];

    this.viewModel.fileStatus = UtilityHelpers.validateFile(file);

    if (!this.viewModel.fileStatus.isSuccess) { return; }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        this.viewModel.addFile(reader.result as string);
    };
  }

  addPayment(): void {

    const data = this.viewModel.addPayment();

    if (!data) { return; }

    this.newPayment.emit(data);
    this.activeModal.close()
  }

}
