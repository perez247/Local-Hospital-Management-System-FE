import { PrivateSettingsComponent } from './pages/private-settings/private-settings.component';
import { PrivateSingleFinancePaidComponent } from './pages/private-single-finance-paid/private-single-finance-paid.component';
import { PrivateFinancePaidComponent } from './pages/private-finance-paid/private-finance-paid.component';
import { PrivateFinanceDebtsComponent } from './pages/private-finance-debts/private-finance-debts.component';
import { PrivateSingleFinanceDebtComponent } from './pages/private-single-finance-debt/private-single-finance-debt.component';
import { PrivateFinanceTicketsComponent } from './pages/private-finance-tickets/private-finance-tickets.component';
import { PrivateFinanceContractsComponent } from './pages/private-finance-contracts/private-finance-contracts.component';
import { PrivateSingleTicketComponent } from './pages/private-single-ticket/private-single-ticket.component';
import { PrivateSinglePatientComponent } from './pages/private-single-patient/private-single-patient.component';
import { PrivateTicketsComponent } from './pages/private-tickets/private-tickets.component';
import { PrivateAppointmentsComponent } from './pages/private-appointments/private-appointments.component';
import { PrivateInventoryComponent } from './pages/private-inventory/private-inventory.component';
import { PrivateStaffComponent } from './pages/private-staff/private-staff.component';
import { PrivatePatientsComponent } from './pages/private-patients/private-patients.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationRoutes } from '../shared/core/routes/app-routes';
import { PrivateLayoutContentComponent } from './layout/private-layout-content/private-layout-content.component';
import { PrivateLayoutFullComponent } from './layout/private-layout-full/private-layout-full.component';
import { PrivateDashboardComponent } from './pages/private-dashboard/private-dashboard.component';
import { PrivateWelcomeUserComponent } from './pages/private-welcome-user/private-welcome-user.component';
import { PrivateCompanyComponent } from './pages/private-company/private-company.component';
import { PrivateNotfoundComponent } from './pages/private-notfound/private-notfound.component';
import { PrivateSingleStaffComponent } from './pages/private-single-staff/private-single-staff.component';
import { PrivateSingleCompanyComponent } from './pages/private-single-company/private-single-company.component';
import { PrivateSingleInventoryComponent } from './pages/private-single-inventory/private-single-inventory.component';
import { PrivateSingleAppointmentComponent } from './pages/private-single-appointment/private-single-appointment.component';
import { PrivateFinanceComponent } from './pages/private-finance/private-finance.component';
import { OnlyFinanceRoleGuard } from '../shared/guards/only-finance-role.guard';

const appRoutes = ApplicationRoutes.generateRoutes();
const routes: Routes = [
  {
    path: '',
    redirectTo: `${appRoutes.privateRoute.welcome().$name}`,
    pathMatch: 'full'
  },
  {
    path: '',
    component: PrivateLayoutContentComponent,
    children: [
      {
        path: `${appRoutes.privateRoute.welcome().$name}`,
        component: PrivateWelcomeUserComponent
      },
    ]
  },
  {
    path: '',
    component: PrivateLayoutFullComponent,
    children: [
      {
        path: `${appRoutes.privateRoute.dashboard().$name}`,
        component: PrivateDashboardComponent
      },
      {
        path: `${appRoutes.privateRoute.single_patient().$name}`,
        component: PrivateSinglePatientComponent
      },
      {
        path: `${appRoutes.privateRoute.patients().$name}`,
        component: PrivatePatientsComponent
      },
      {
        path: `${appRoutes.privateRoute.single_staff().$name}`,
        component: PrivateSingleStaffComponent
      },
      {
        path: `${appRoutes.privateRoute.staff().$name}`,
        component: PrivateStaffComponent
      },
      {
        path: `${appRoutes.privateRoute.single_company().$name}`,
        component: PrivateSingleCompanyComponent
      },
      {
        path: `${appRoutes.privateRoute.companies().$name}`,
        component: PrivateCompanyComponent
      },
      {
        path: `${appRoutes.privateRoute.single_inventory().$name}`,
        component: PrivateSingleInventoryComponent
      },
      {
        path: `${appRoutes.privateRoute.inventories().$name}`,
        component: PrivateInventoryComponent
      },
      {
        path: `${appRoutes.privateRoute.single_appointment().$name}`,
        component: PrivateSingleAppointmentComponent
      },
      {
        path: `${appRoutes.privateRoute.appointments().$name}`,
        component: PrivateAppointmentsComponent
      },
      {
        path: `${appRoutes.privateRoute.single_ticket().$name}`,
        component: PrivateSingleTicketComponent
      },
      {
        path: `${appRoutes.privateRoute.tickets().$name}`,
        component: PrivateTicketsComponent
      },
      {
        path: `${appRoutes.privateRoute.settings().$name}`,
        component: PrivateSettingsComponent
      },
      {
        path: `${appRoutes.privateRoute.notfound(':error').$name}`,
        component: PrivateNotfoundComponent
      },
      {
        path: ``,
        component: PrivateFinanceComponent,
        canActivate: [OnlyFinanceRoleGuard],
        children: [
          {
            path: `${appRoutes.privateRoute.finance_contracts().$name}`,
            component: PrivateFinanceContractsComponent
          },
          {
            path: `${appRoutes.privateRoute.Single_finance_tickets().$name}`,
            component: PrivateSingleTicketComponent
          },
          {
            path: `${appRoutes.privateRoute.finance_tickets().$name}`,
            component: PrivateFinanceTicketsComponent
          },
          {
            path: `${appRoutes.privateRoute.single_finance_debt().$name}`,
            component: PrivateSingleFinanceDebtComponent
          },
          {
            path: `${appRoutes.privateRoute.finance_debts().$name}`,
            component: PrivateFinanceDebtsComponent
          },
          {
            path: `${appRoutes.privateRoute.single_finance_paid().$name}`,
            component: PrivateSingleFinancePaidComponent
          },
          {
            path: `${appRoutes.privateRoute.finance_paid().$name}`,
            component: PrivateFinancePaidComponent
          },
        ]
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
