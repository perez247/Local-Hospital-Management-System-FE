import { AppFileService } from '../../../shared/services/common/app-file/app-file.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { faFileAlt, faDownload, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { UtilityHelpers } from 'src/app/shared/core/functions/utility-helpers';
import { AppConstants } from 'src/app/shared/core/models/app-constants';
import { AppUser } from 'src/app/shared/core/models/app-user';
import { UserFile } from 'src/app/shared/core/models/files';
import { UserService } from 'src/app/shared/services/api/user/user.service';
import { CustomErrorService } from 'src/app/shared/services/common/custom-error/custom-error.service';
import { CustomToastService } from 'src/app/shared/services/common/custom-toast/custom-toast.service';
import { saveAs } from 'file-saver';
import { IConfirmAction, SharedConfirmActionModalComponent } from 'src/app/shared/modals/shared-confirm-action-modal/shared-confirm-action-modal.component';
import { PrivateUploadFilesModalComponent } from '../../modals/private-upload-files-modal/private-upload-files-modal.component';
import { AppRoles } from 'src/app/shared/core/models/app-roles';

@Component({
  selector: 'app-private-user-files',
  templateUrl: './private-user-files.component.html',
  styleUrls: ['./private-user-files.component.scss']
})
export class PrivateUserFilesComponent extends SharedUtilityComponent implements OnInit {

  @Output() reload = new EventEmitter<string>();

  @Input() user?: AppUser;

  fonts = { faFileAlt, faDownload, faTrash }

  userSections = AppConstants.UserSections;

  userFiles: UserFile[] = [];

  isLoadingFile = false;

  roles = AppRoles;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    public errorService: CustomErrorService,
    private modalService: NgbModal,
    private toast: CustomToastService,
    private appFileService: AppFileService,
    ) {
    super();
  }

  override ngOnInit(): void {
    this.getUserFiles();
  }

  getUserFiles(): void {

    this.isLoading = true;
    const sub = this.userService.getFiles(this.user?.base?.id, '')
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data: UserFile[]) => {
          this.userFiles = data;
        },
        error: (error) => {
          console.error(error);
        }
      });
    this.subscriptions.push(sub);
  }

  downloadFile(fileId?: string): void {
    this.isLoadingFile = true;
    const sub = this.userService.getFiles('', fileId)
      .pipe(finalize(() => this.isLoadingFile = false))
      .subscribe({
        next: (data: UserFile[]) => {
          if (data.length <= 0) {
            this.toast.error('No file to download');
            return;
          }

          this.beginDownload(data[0]);

        },
        error: (error) => {
          console.error(error);
        }
      });
    this.subscriptions.push(sub);
  }

  private beginDownload(userFile: UserFile) {
    this.appFileService.download(userFile);
  }

  openUploadFileModal(): void {
    const modalRef = this.modalService.open(PrivateUploadFilesModalComponent, { size: 'lg'});
    modalRef.componentInstance.total = 5;

    const sub = modalRef.componentInstance.newImages.subscribe({
      next: (base64: any) => {
        this.addFiles(base64);
      }
    });

    this.subscriptions.push(sub);
  }

  confirmDeleteOfFile(file: UserFile): void {
    const modalRef = this.modalService.open(SharedConfirmActionModalComponent);
    const confirmData = {
      title: `Delete user file`,
      body: `Are you sure you want to delete <strong>${file.name}</strong>`,
      positiveBtn: `Yes, Delete`,
      positiveBtnCss: `btn btn-primary`,
      nagativeBtn: `No, Cancel`,
      negativeBtnCss: `btn btn-danger`
    } as IConfirmAction;

    modalRef.componentInstance.confirmData = confirmData;
    const sub = modalRef.componentInstance.actionTaken.subscribe({
      next: (takeAction: boolean) => {
        if(takeAction) {
          this.deleteFile(file);
        }
      }
    });
    this.subscriptions.push(sub)
  }

  private deleteFile(userFile: UserFile) {
    this.isLoadingFile = true;
    const data = {  userId: this.user?.base?.id, UserFileIds: [userFile.id] }
    const sub = this.userService.deleteFile(data)
      .pipe(finalize(() => this.isLoadingFile = false))
      .subscribe({
        next: (data) => {
          this.toast.success(`${userFile.name} deleted successfully`);
          this.reload.emit(this.userSections.userFiles);
        },
        error: (error) => {
          console.error(error);
        }
      });
    this.subscriptions.push(sub);
  }

  private addFiles(filesToAdd: any): void {
    const data = { userId: this.user?.base?.id, UserFiles: filesToAdd }
    this.isLoading = true;
    const sub = this.userService.addFiles(data)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {
          this.toast.success(`Files added successfully`);
          this.reload.emit(this.userSections.userFiles);
        },
        error: (error) => {
          console.error(error);
        }
      });
    this.subscriptions.push(sub);
  }



}
