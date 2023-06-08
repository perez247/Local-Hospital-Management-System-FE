import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TicketInventory } from 'src/app/shared/core/models/app-ticket';
import { PrivateUploadProfilePictureModalComponent } from '../../private-upload-profile-picture-modal/private-upload-profile-picture-modal.component';
import { SharedViewImageComponent } from 'src/app/shared/modals/shared-view-image/shared-view-image.component';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Confirmable } from 'src/app/shared/decorators/confirm-action-method-decorator';

@Component({
  selector: 'app-private-save-lab-rad-proof',
  templateUrl: './private-save-lab-rad-proof.component.html',
  styleUrls: ['./private-save-lab-rad-proof.component.scss']
})
export class PrivateSaveLabRadProofComponent implements OnInit {

  @Input() ticketInventory: TicketInventory = {} as TicketInventory;

  fonts = { faTrashAlt }

  constructor(
    private modalService: NgbModal,
    ) { }

  ngOnInit(): void {
  }

  openUploadProfileModal(): void {
    const modalRef = this.modalService.open(PrivateUploadProfilePictureModalComponent, { size: 'lg'});

    const sub = modalRef.componentInstance.newImage.subscribe({
      next: (base64: string) => {
        this.ticketInventory.proof.push(base64);
      }
    });
  }

  viewImage(fileUrl: string): void {
    const modalRef = this.modalService.open(SharedViewImageComponent, { size: 'lg'});
    const component: SharedViewImageComponent = modalRef.componentInstance;

    component.fileUrl = fileUrl;
  }

  @Confirmable({
    title: 'Remove result image',
    html: 'Are you sure you want to remove this image?'
  })
  removeImage(index: number): void {
    this.ticketInventory.proof.splice(index, 1);
  }

}
