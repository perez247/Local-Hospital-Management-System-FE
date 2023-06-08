import { CustomErrorMessageComponent } from './components/custom-error-message/custom-error-message.component';
import { VendorsModule } from './modules/VendorsModule';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { JwtInterceptorProvider } from './interceptors/jwt.interceptor';
import { SharedUtilityComponent } from './components/shared-utility/shared-utility.component';
import { SharedLoadingComponent } from './components/shared-loading/shared-loading.component';
import { DisplayProfileImageDirective } from './directives/display-profile-image.directive';
import { ErrorInterceptorProvider } from './interceptors/error.interceptor';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { SharedConfirmActionModalComponent } from './modals/shared-confirm-action-modal/shared-confirm-action-modal.component';
import { SharedUserAutocompleteComponent } from './components/shared-user-autocomplete/shared-user-autocomplete.component';
import { SharedInventoryAutocompleteComponent } from './components/shared-inventory-autocomplete/shared-inventory-autocomplete.component';
import { CalendarModule } from 'angular-calendar';
import { TrimSentencePipe } from './pipes/trim-sentence.pipe';
import { HoverClassDirective } from './directives/hover-class.directive';
import { AppErrorInterceptorProvider } from './interceptors/app-error.handler';
import { ShortNumberPipe } from './pipes/short-number.pipe';
import { HasRoleDirective } from './directives/has-role.directive';
import { ContractDetailPipe } from './pipes/contract-detail.pipe';
import { SharedToastComponent } from './components/shared-toast/shared-toast.component';
import { PaidDebtPipe } from './pipes/paid-debt.pipe';
import { UserIdPipe } from './pipes/user-id.pipe';
import { SharedViewImageComponent } from './modals/shared-view-image/shared-view-image.component';

@NgModule({
  declarations: [
    // Directive
    DisplayProfileImageDirective,
    HoverClassDirective,
    HasRoleDirective,

    // Pipes
    TrimSentencePipe,
    ShortNumberPipe,
    ContractDetailPipe,
    PaidDebtPipe,
    UserIdPipe,

    SharedUtilityComponent,
    CustomErrorMessageComponent,
    SharedLoadingComponent,
    SharedConfirmActionModalComponent,
    SharedUserAutocompleteComponent,
    SharedInventoryAutocompleteComponent,
    ShortNumberPipe,
    HasRoleDirective,
    ContractDetailPipe,
    SharedToastComponent,
    SharedViewImageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    CalendarModule,

    // Vendors
    VendorsModule,
    AngularEditorModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    CalendarModule,

    // Vendors
    VendorsModule,
    AngularEditorModule,

    // Components
    SharedUtilityComponent,
    CustomErrorMessageComponent,
    SharedLoadingComponent,
    SharedConfirmActionModalComponent,
    SharedUserAutocompleteComponent,
    SharedInventoryAutocompleteComponent,
    SharedToastComponent,
    SharedViewImageComponent,

    // Directives
    DisplayProfileImageDirective,
    HoverClassDirective,
    HasRoleDirective,

    // Pipes
    TrimSentencePipe,
    ShortNumberPipe,
    ContractDetailPipe,
    PaidDebtPipe,
    UserIdPipe,
  ],
  providers: [

    // Before a call is made to the backend add the authToken to it
    JwtInterceptorProvider,
    ErrorInterceptorProvider,
    AppErrorInterceptorProvider,
  ]
})
export class SharedModule { }
