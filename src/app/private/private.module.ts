import { NgModule } from '@angular/core';
import { PrivateRoutingModule } from './private-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PrivateWelcomeUserComponent } from './pages/private-welcome-user/private-welcome-user.component';
import { PrivateLayoutContentComponent } from './layout/private-layout-content/private-layout-content.component';
import { PrivateLayoutFullComponent } from './layout/private-layout-full/private-layout-full.component';
import { PrivateDashboardComponent } from './pages/private-dashboard/private-dashboard.component';
import { PrivateNavbarComponent } from './components/private-navbar/private-navbar.component';
import { PrivateSideMenuComponent } from './components/private-side-menu/private-side-menu.component';
import { PrivatePatientsComponent } from './pages/private-patients/private-patients.component';
import { PrivateStaffComponent } from './pages/private-staff/private-staff.component';
import { PrivateCompanyComponent } from './pages/private-company/private-company.component';
import { PrivateInventoryComponent } from './pages/private-inventory/private-inventory.component';
import { PrivateAppointmentsComponent } from './pages/private-appointments/private-appointments.component';
import { PrivateTicketsComponent } from './pages/private-tickets/private-tickets.component';
import { PrivateFinanceComponent } from './pages/private-finance/private-finance.component';
import { PrivateSinglePatientComponent } from './pages/private-single-patient/private-single-patient.component';
import { PrivateUserPersonalDetailComponent } from './components/private-user-personal-detail/private-user-personal-detail.component';
import { PrivateNotfoundComponent } from './pages/private-notfound/private-notfound.component';
import { PrivateUserNextOfKinComponent } from './components/private-user-next-of-kin/private-user-next-of-kin.component';
import { PrivatePatientAllergiesComponent } from './components/private-patient-allergies/private-patient-allergies.component';
import { PrivatePatientVitalsComponent } from './components/private-patient-vitals/private-patient-vitals.component';
import { PrivateUserContractComponent } from './components/private-user-contract/private-user-contract.component';
import { PrivateSingleStaffComponent } from './pages/private-single-staff/private-single-staff.component';
import { PrivateStaffDetailsComponent } from './components/private-staff-details/private-staff-details.component';
import { PrivateSingleCompanyComponent } from './pages/private-single-company/private-single-company.component';
import { PrivateCompanyDetailsComponent } from './components/private-company-details/private-company-details.component';
import { PrivateUserFilesComponent } from './components/private-user-files/private-user-files.component';
import { PrivateSingleInventoryComponent } from './pages/private-single-inventory/private-single-inventory.component';
import { PrivateInventoryDetailsComponent } from './components/private-inventory-details/private-inventory-details.component';
import { PrivateInventoryItemsComponent } from './components/private-inventory-items/private-inventory-items.component';
import { PrivateCompanyIntentoryItemsComponent } from './components/private-company-intentory-items/private-company-intentory-items.component';
import { PrivateSingleAppointmentComponent } from './pages/private-single-appointment/private-single-appointment.component';
import { PrivateAppointmentTicketsComponent } from './components/private-appointment-tickets/private-appointment-tickets.component';
import { PrivateTicketInventoryTemplateComponent } from './components/private-ticket-inventory-template/private-ticket-inventory-template.component';
import { PrivateAppointmentsByCalendarComponent } from './components/private-appointments-by-calendar/private-appointments-by-calendar.component';
import { PrivateAppointmentsByListComponent } from './components/private-appointments-by-list/private-appointments-by-list.component';
import { PrivateAddAPatientModalComponent } from './modals/private-add-a-patient-modal/private-add-a-patient-modal.component';
import { PrivateAddAStaffModalComponent } from './modals/private-add-a-staff-modal/private-add-a-staff-modal.component';
import { PrivateAddCompanyInventoryItemModalComponent } from './modals/private-add-company-inventory-item-modal/private-add-company-inventory-item-modal.component';
import { PrivateAddCompanyModalComponent } from './modals/private-add-company-modal/private-add-company-modal.component';
import { PrivateAddInventoryItemsModalComponent } from './modals/private-add-inventory-items-modal/private-add-inventory-items-modal.component';
import { PrivateAddInventoryModalComponent } from './modals/private-add-inventory-modal/private-add-inventory-modal.component';
import { PrivateFilterCompaniesModalComponent } from './modals/private-filter-companies-modal/private-filter-companies-modal.component';
import { PrivateFilterInventoryItemModalComponent } from './modals/private-filter-inventory-item-modal/private-filter-inventory-item-modal.component';
import { PrivateFilterInventoryModalComponent } from './modals/private-filter-inventory-modal/private-filter-inventory-modal.component';
import { PrivateFilterPatientsModalComponent } from './modals/private-filter-patients-modal/private-filter-patients-modal.component';
import { PrivateFilterStaffModalComponent } from './modals/private-filter-staff-modal/private-filter-staff-modal.component';
import { PrivateAddViewPatientVitalModalComponent } from './modals/private-add-view-patient-vital-modal/private-add-view-patient-vital-modal.component';
import { PrivateCreateSurgeryTicketModalComponent } from './modals/private-create-ticket-modal/private-create-surgery-ticket-modal/private-create-surgery-ticket-modal.component';
import { PrivateCreateAdmissionTicketModalComponent } from './modals/private-create-ticket-modal/private-create-admission-ticket-modal/private-create-admission-ticket-modal.component';
import { PrivateCreateLabTicketModalComponent } from './modals/private-create-ticket-modal/private-create-lab-ticket-modal/private-create-lab-ticket-modal.component';
import { PrivateCreatePharmacyTicketModalComponent } from './modals/private-create-ticket-modal/private-create-pharmacy-ticket-modal/private-create-pharmacy-ticket-modal.component';
import { PrivateCreateRadiologyTicketModalComponent } from './modals/private-create-ticket-modal/private-create-radiology-ticket-modal/private-create-radiology-ticket-modal.component';
import { PrivateCreateTicketModalComponent } from './modals/private-create-ticket-modal/private-create-ticket-modal.component';
import { PrivateFilterAppointmentsModalComponent } from './modals/private-filter-appointments-modal/private-filter-appointments-modal.component';
import { PrivateUploadFilesModalComponent } from './modals/private-upload-files-modal/private-upload-files-modal.component';
import { PrivateUploadProfilePictureModalComponent } from './modals/private-upload-profile-picture-modal/private-upload-profile-picture-modal.component';
import { PrivateViewAppointmentsByDateModalComponent } from './modals/private-view-appointments-by-date-modal/private-view-appointments-by-date-modal.component';
import { PrivateViewTicketModalComponent } from './modals/private-view-ticket-modal/private-view-ticket-modal.component';
import { PrivateCreatePatientAppointmentModalComponent } from './modals/private-create-patient-appointment-modal/private-create-patient-appointment-modal.component';
import { PrivateFilterCompanyInventoryItemsModalComponent } from './modals/private-filter-company-inventory-items-modal/private-filter-company-inventory-items-modal.component';
import { PrivateUpdateAppointmentModalComponent } from './modals/private-update-appointment-modal/private-update-appointment-modal.component';
import { PrivateSingleTicketComponent } from './pages/private-single-ticket/private-single-ticket.component';
import { PrivateAppointmentOverallDescriptionComponent } from './components/private-appointment-overall-description/private-appointment-overall-description.component';
import { PrivatePharmacyTicketListComponent } from './components/private-pharmacy-ticket-list/private-pharmacy-ticket-list.component';
import { PrivateFilterTicketsComponent } from './modals/private-filter-tickets/private-filter-tickets.component';
import { PrivateFinanceTicketsComponent } from './pages/private-finance-tickets/private-finance-tickets.component';
import { PrivateFinanceContractsComponent } from './pages/private-finance-contracts/private-finance-contracts.component';
import { PrivateGeneralTicketOverviewComponent } from './components/private-general-ticket-overview/private-general-ticket-overview.component';
import { PrivatePharmacyTicketItemComponent } from './components/private-pharmacy-ticket-list/private-pharmacy-ticket-item/private-pharmacy-ticket-item.component';
import { PrivateMakeInitialPaymentComponent } from './modals/private-make-initial-payment/private-make-initial-payment.component';
import { PrivateCompletePaymentComponent } from './modals/private-complete-payment/private-complete-payment.component';
import { PrivateAddPaymentModalComponent } from './modals/private-add-payment-modal/private-add-payment-modal.component';
import { PrivateFinanceInventoryComponent } from './components/private-finance-inventory/private-finance-inventory.component';
import { PrivatePatientContractComponent } from './components/private-patient-contract/private-patient-contract.component';
import { PrivateCompanyContractComponent } from './components/private-company-contract/private-company-contract.component';
import { PrivateFilterFinanceContractModalComponent } from './modals/private-filter-finance-contract-modal/private-filter-finance-contract-modal.component';
import { PrivateStaffRolesComponent } from './components/private-staff-roles/private-staff-roles.component';
import { PrivatePatientChangeCompanyComponent } from './modals/private-patient-change-company/private-patient-change-company.component';

@NgModule({
  declarations: [
    // Modals---------------------------------------------
    PrivateAddAPatientModalComponent,
    PrivateAddAStaffModalComponent,
    PrivateAddCompanyInventoryItemModalComponent,
    PrivateAddCompanyModalComponent,
    PrivateAddInventoryItemsModalComponent,
    PrivateAddInventoryModalComponent,
    PrivateFilterCompaniesModalComponent,
    PrivateFilterInventoryItemModalComponent,
    PrivateFilterInventoryModalComponent,
    PrivateFilterPatientsModalComponent,
    PrivateFilterStaffModalComponent,
    PrivateAddViewPatientVitalModalComponent,
    PrivateCreateSurgeryTicketModalComponent,
    PrivateCreateAdmissionTicketModalComponent,
    PrivateCreateLabTicketModalComponent,
    PrivateCreatePharmacyTicketModalComponent,
    PrivateCreateRadiologyTicketModalComponent,
    PrivateCreateTicketModalComponent,
    PrivateFilterAppointmentsModalComponent,
    PrivateUploadFilesModalComponent,
    PrivateUploadProfilePictureModalComponent,
    PrivateViewAppointmentsByDateModalComponent,
    PrivateViewTicketModalComponent,
    PrivateCreatePatientAppointmentModalComponent,
    PrivateFilterCompanyInventoryItemsModalComponent,
    PrivateUpdateAppointmentModalComponent,

    // Components-----------------------------------------
    PrivateLayoutContentComponent,
    PrivateLayoutFullComponent,
    PrivateWelcomeUserComponent,
    PrivateDashboardComponent,
    PrivateNavbarComponent,
    PrivateSideMenuComponent,
    PrivatePatientsComponent,
    PrivateStaffComponent,
    PrivateCompanyComponent,
    PrivateInventoryComponent,
    PrivateAppointmentsComponent,
    PrivateTicketsComponent,
    PrivateFinanceComponent,
    PrivateSinglePatientComponent,
    PrivateUserPersonalDetailComponent,
    PrivateNotfoundComponent,
    PrivateUserNextOfKinComponent,
    PrivatePatientAllergiesComponent,
    PrivatePatientVitalsComponent,
    PrivateUserContractComponent,
    PrivateSingleStaffComponent,
    PrivateStaffDetailsComponent,
    PrivateSingleCompanyComponent,
    PrivateCompanyDetailsComponent,
    PrivateUserFilesComponent,
    PrivateSingleInventoryComponent,
    PrivateInventoryDetailsComponent,
    PrivateInventoryItemsComponent,
    PrivateCompanyIntentoryItemsComponent,
    PrivateSingleAppointmentComponent,
    PrivateAppointmentTicketsComponent,
    PrivateTicketInventoryTemplateComponent,
    PrivateAppointmentsByCalendarComponent,
    PrivateAppointmentsByListComponent,
    PrivateSingleTicketComponent,
    PrivateAppointmentOverallDescriptionComponent,
    PrivatePharmacyTicketListComponent,
    PrivateFilterTicketsComponent,
    PrivateFinanceTicketsComponent,
    PrivateFinanceContractsComponent,
    PrivateGeneralTicketOverviewComponent,
    PrivatePharmacyTicketItemComponent,
    PrivateMakeInitialPaymentComponent,
    PrivateCompletePaymentComponent,
    PrivateAddPaymentModalComponent,
    PrivateFinanceInventoryComponent,
    PrivatePatientContractComponent,
    PrivateCompanyContractComponent,
    PrivateFilterFinanceContractModalComponent,
    PrivateStaffRolesComponent,
    PrivatePatientChangeCompanyComponent,
  ],
  imports: [
    PrivateRoutingModule,
    SharedModule
  ]
})
export class PrivateModule { }
