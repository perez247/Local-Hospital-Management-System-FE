import { NgModule } from '@angular/core';

import {
  NgbCarouselModule,
  NgbDateAdapter,
  NgbDateNativeAdapter,
  NgbDatepicker,
  NgbDatepickerModule,
  NgbDropdownModule,
  NgbModule,
  NgbNavModule,
  NgbPaginationModule,
  NgbPopoverModule,
  NgbRatingModule,
  NgbTimepickerModule,
  NgbToastModule,
  NgbTooltipModule
} from '@ng-bootstrap/ng-bootstrap';

import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  declarations: [],
  imports: [
    NgbModule,
    NgbDatepickerModule,
    NgbDropdownModule,
    NgbPaginationModule,
    NgbNavModule,
    NgbTooltipModule,
    NgbCarouselModule,
    NgbRatingModule,
    NgbPopoverModule,
    NgbTimepickerModule,
    NgbToastModule,
    NgbDatepickerModule,
    NgbToastModule,
    NgbNavModule,

    // Image cropper
    ImageCropperModule,
],
exports: [
    NgbModule,
    NgbDatepickerModule,
    NgbDropdownModule,
    NgbPaginationModule,
    NgbNavModule,
    NgbTooltipModule,
    NgbCarouselModule,
    NgbRatingModule,
    NgbPopoverModule,
    NgbTimepickerModule,
    NgbToastModule,
    NgbDatepickerModule,
    NgbToastModule,
    NgbNavModule,

    // Image cropper
    ImageCropperModule,
],
providers: [
  {provide: NgbDateAdapter, useClass: NgbDateNativeAdapter},
]
})
export class VendorsModule { }
