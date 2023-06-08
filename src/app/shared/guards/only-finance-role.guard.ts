import { CustomToastService } from './../services/common/custom-toast/custom-toast.service';
import { AppRoles } from './../core/models/app-roles';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApplicationRoutes } from '../core/routes/app-routes';
import { EventBusService } from '../services/common/event-bus/event-bus.service';

@Injectable({
  providedIn: 'root'
})
export class OnlyFinanceRoleGuard implements CanActivate {
  appRoutes = ApplicationRoutes.generateRoutes();
  roles = AppRoles;

  constructor(
    private eventBus: EventBusService,
    private toast: CustomToastService,
    private router: Router
  )
  {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const roles = this.eventBus.getState().user.value?.userRoles || [];

      const hasFinance = roles.find(x => x === this.roles.finance || x === this.roles.admin);

      if (!hasFinance) {
        this.toast.error("Access denied to view finance");
        this.router.navigate([this.appRoutes.privateRoute.dashboard().$absolutePath]);
        return true;
      }

    return true;
  }

}
