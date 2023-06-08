import { Subscription } from 'rxjs';
import { AppUser } from 'src/app/shared/core/models/app-user';
import { EventBusService } from './../services/common/event-bus/event-bus.service';
import { Directive, Input, OnInit, OnDestroy, ElementRef, Renderer2 } from '@angular/core';
import { EventBusActions } from '../services/common/event-bus/event-bus-action';

@Directive({
  selector: '[appHasRole]',
  exportAs: 'appHasRole'
})
export class HasRoleDirective implements OnInit, OnDestroy {

  @Input() roles: (string | undefined)[] = [];
  @Input() operator: string = 'or';

  currentUser?: AppUser;
  subscriptions: Subscription[] = [];
  classes = '';

  constructor(
    private eventBus: EventBusService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
  ) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.currentUser = this.eventBus.getState().user.value ?? {} as AppUser;
    this.listenForChanges();
    this.checkRole();
  }

  listenForChanges(): void {
    const userSub = this.eventBus.on(EventBusActions.state.currentUser, (user: AppUser) => {
      this.currentUser = user;
      this.checkRole();
    });

    this.subscriptions.push(userSub);
  }

  checkRole(): void {
    const list: string[] = this.elementRef.nativeElement.classList;
    let classes: string[] = [];
    list.forEach(element => {
      classes.push(element);
    });

    this.classes = classes.join(' ');
    if (!this.currentUser) {
      this.hideElement();
      return;
    }

    if (this.roles.length <= 0) {

      this.hideElement();
      return;
    }

    let hasRole: boolean[] = [];
    const roles = this.getUserRoles();
    this.roles.forEach(x => {
      var role = roles?.find(a => a === x);
      if (role) {
        hasRole.push(true);
      } else {
        hasRole.push(false);
      }
    });

    if (this.operator === 'and') {
      if (!hasRole.every(Boolean)) {
      this.hideElement();
      } else {
        this.showElement();
      }
    } else {
      if (!hasRole.some(Boolean)) {
      this.hideElement();
      } else {
        this.showElement();
      }
    }

  }

  getUserRoles(): string[]
  {
    const roles = this.currentUser?.userRoles || [];

    const id = this.currentUser?.base?.id || ''

    const hasId = roles.find(x => x === id);

    if (!hasId) {
      roles.push(id);
    }

    return roles;
  }

  hideElement(): void {
    this.renderer.removeClass(this.elementRef.nativeElement, 'd-block');
    this.renderer.addClass(this.elementRef.nativeElement, 'd-none');
  }

  showElement(): void {
    this.renderer.removeClass(this.elementRef.nativeElement, 'd-none');
    this.renderer.addClass(this.elementRef.nativeElement, 'd-block');
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }
}
