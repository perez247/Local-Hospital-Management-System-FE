import { Component, Input, OnInit } from '@angular/core';
import { faTicket, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { AppTicket } from 'src/app/shared/core/models/app-ticket';
import { ApplicationRoutes } from 'src/app/shared/core/routes/app-routes';

@Component({
  selector: 'app-private-general-ticket-overview',
  templateUrl: './private-general-ticket-overview.component.html',
  styleUrls: ['./private-general-ticket-overview.component.scss']
})
export class PrivateGeneralTicketOverviewComponent implements OnInit {

  @Input() ticket?: AppTicket;
  @Input() finance: boolean = false;

  fonts = { faTicket, faEllipsisV }

  routes = ApplicationRoutes.generateRoutes();

  constructor() { }

  ngOnInit(): void { }

}
