import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faTicket, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { AppTicket, AppTicketTypes } from 'src/app/shared/core/models/app-ticket';
import { ApplicationRoutes } from 'src/app/shared/core/routes/app-routes';

@Component({
  selector: 'app-private-general-ticket-overview',
  templateUrl: './private-general-ticket-overview.component.html',
  styleUrls: ['./private-general-ticket-overview.component.scss']
})
export class PrivateGeneralTicketOverviewComponent implements OnInit {

  @Input() ticket?: AppTicket;

  fonts = { faTicket, faEllipsisV }

  routes = ApplicationRoutes.generateRoutes();

  appTicketTypes = AppTicketTypes;

  route = '';
  admissionRoute = '';

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.setTicketRoute();
  }

  setTicketRoute(): void {

    this.admissionRoute = `/${this.routes.privateRoute.single_admission(this.ticket?.base.id).$absolutePath}`;
    if (this.router.url === '/private/finance-tickets')
    {
      this.route = `/${this.routes.privateRoute.Single_finance_tickets(this.ticket?.base.id).$absolutePath}`;
      // this.router.navigate([`/${this.routes.privateRoute.Single_finance_tickets(this.ticket?.base.id).$absolutePath}`])
    }
    // else if (this.router.url === '/private/admissions')
    // {
    //   this.route = `/${this.routes.privateRoute.single_admission(this.ticket?.base.id).$absolutePath}`;
    //   // this.router.navigate([`/${this.routes.privateRoute.single_admission(this.ticket?.base.id).$absolutePath}`])
    // }
    else {
      this.route = `/${this.routes.privateRoute.single_ticket(this.ticket?.base.id).$absolutePath}`;
      // this.router.navigate([`/${this.routes.privateRoute.single_ticket(this.ticket?.base.id).$absolutePath}`])
    }
  }

  getFirstAdmission(): string | undefined {
    console.log(this.ticket?.ticketInventories);
    return this.ticket?.ticketInventories[0]?.inventory.name;
  }
}
