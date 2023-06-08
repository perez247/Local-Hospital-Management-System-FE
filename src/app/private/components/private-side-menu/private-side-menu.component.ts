import { AppRoles } from './../../../shared/core/models/app-roles';
import { SharedUtilityComponent } from './../../../shared/components/shared-utility/shared-utility.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationRoutes } from 'src/app/shared/core/routes/app-routes';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import {
  faEllipsisV, faHamburger,
  faBedPulse, faChartLine,
  faClipboardUser, faBuilding,
  faWarehouse, faCalendarCheck,
  faTicket, faCoins,
  faSignature, faSackXmark, faHandHoldingDollar,
  faCog
} from '@fortawesome/free-solid-svg-icons';
import * as $ from "jquery";
import { EventBusService } from 'src/app/shared/services/common/event-bus/event-bus.service';
import { EventBusActions } from 'src/app/shared/services/common/event-bus/event-bus-action';
import { AppUser } from 'src/app/shared/core/models/app-user';
import { AppConstants } from 'src/app/shared/core/models/app-constants';

@Component({
  selector: 'app-private-side-menu',
  templateUrl: './private-side-menu.component.html',
  styleUrls: ['./private-side-menu.component.scss']
})
export class PrivateSideMenuComponent extends SharedUtilityComponent implements OnInit, AfterViewInit  {

  fonts = { faSignature, faEllipsisV, faHamburger, faBedPulse, faChartLine, faClipboardUser, faBuilding, faWarehouse, faCalendarCheck, faTicket, faCoins, faSackXmark, faHandHoldingDollar, faCog }

  openBar = true;

  appRroutes = ApplicationRoutes.generateRoutes();

  @ViewChild('financeBlock') financeBlock: ElementRef = {} as ElementRef;
  currentUser?: AppUser;

  roles = AppRoles;

  ticketRoles: (string | undefined)[] = []
  lookupType = AppConstants.LookUpType;

  constructor(
    private eventBus: EventBusService,
    private route: Router
  ) {
    super();
  }

  override ngOnInit(): void {
    this.setTicketRoles();
    this.currentUser = this.eventBus.getState().user.value ?? {} as AppUser;
    this.listenForChanges();
  }

  ngAfterViewInit(): void {
    this.isFinance();
  }

  setTicketRoles(): void {
    this.ticketRoles = this.eventBus.getState().lookUps.value?.filter(x => x.type === this.lookupType.AppInventoryType).map(y => y.name) || [];
    this.ticketRoles?.push(this.roles.admin);
  }

  isFinance(): void {
    const url = this.route.url;
    if (url.includes('finance-')) {
      this.financeBlock.nativeElement.click();
    }
  }

  listenForChanges(): void {
    const menusub = this.eventBus.on(EventBusActions.state.menu, (state: boolean) => {
      this.openBar = state;
    });

    this.subscriptions.push(menusub);

    const userSub = this.eventBus.on(EventBusActions.state.currentUser, (user: AppUser) => {
      this.currentUser = user;
    });

    this.subscriptions.push(userSub);
  }

  logOut(): void {
    this.eventBus.clearState();
    this.route.navigate([this.appRroutes.publicRoute.signIn().$absolutePath]);
  }

}
