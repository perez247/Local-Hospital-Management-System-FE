import { Router, ActivatedRoute } from '@angular/router';
import { JWTToken } from 'src/app/shared/core/models/jwtToken';
import { EventBusData, EventBusActions } from './../../../shared/services/common/event-bus/event-bus-action';
import { EventBusService } from './../../../shared/services/common/event-bus/event-bus.service';
import { finalize } from 'rxjs';
import { SharedUtilityComponent } from './../../../shared/components/shared-utility/shared-utility.component';
import { CustomToastService } from './../../../shared/services/common/custom-toast/custom-toast.service';
import { PublicAuthFunctions } from './public-auth-functions';
import { AuthService } from './../../../shared/services/api/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ApplicationRoutes } from 'src/app/shared/core/routes/app-routes';
import { UserService } from 'src/app/shared/services/api/user/user.service';
import { CustomErrorService } from 'src/app/shared/services/common/custom-error/custom-error.service';
import { StoreService } from 'src/app/shared/services/common/store/store.service';
import { AppUser, UserFilter } from 'src/app/shared/core/models/app-user';
import { AppPagination, PaginationRequest, PaginationResponse } from 'src/app/shared/core/models/pagination';

@Component({
  selector: 'app-public-auth',
  templateUrl: './public-auth.component.html',
  styleUrls: ['./public-auth.component.scss']
})
export class PublicAuthComponent extends SharedUtilityComponent implements OnInit {

  fonts = { faEye, faEyeSlash }
  appRoutes = ApplicationRoutes.generateRoutes();

  viewPassword = false;

  form: FormGroup = {} as any;

  loginButton = 'Log in';

  staff: AppUser[] = [];
  appPagination = new AppPagination();
  filter = new UserFilter('staff');
  paginationRequest = new PaginationRequest<UserFilter>(this.appPagination, this.filter);
  paginationResponse = new PaginationResponse<AppUser[]>();

  returnUrl? = '';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private fb: FormBuilder,
    public errorService: CustomErrorService,
    private toast: CustomToastService,
    private storeService: StoreService,
    private eventBus: EventBusService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super();
  }

  override ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') ?? this.appRoutes.privateRoute.welcome().$absolutePath;
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = PublicAuthFunctions.createForm(this.fb);
  }

  trySignin(): void {
    // [routerLink]="['/' + appRoutes.privateRoute.welcome().$absolutePath]"
    this.isLoading = true;
    this.loginButton = 'Authenticating...';
    const sub = this.authService.signIn(this.form.value)
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe({
        next: async (data) => {
          const convert = this.storeService.extractToken(data.jwt);

          if (!convert.success) {
            this.toast.error('It seems someting went wrong, kindly refresh the page and try again');
            return;
          }

          await this.eventBus.emit({ key: EventBusActions.state.jwt, value: convert.token } as EventBusData<JWTToken>);
          this.fetchUser(convert.token.nameid);
        },
        error: (error) => {
          throw error;
        }
      });
  }

  fetchUser(userId: string): void {
    this.isLoading = true;
    this.loginButton = 'Fetching data...';
    this.filter.userId = userId;
    this.paginationRequest = new PaginationRequest<UserFilter>(this.appPagination, this.filter);
    const sub = this.userService.getUsers(this.paginationRequest)
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe({
        next: async (data) => {

          this.paginationResponse = data;
          this.staff = data.result ?? [];
          await this.eventBus.emit({ key: EventBusActions.state.currentUser, value: this.staff[0] } as EventBusData<AppUser>);
          this.router.navigate([this.returnUrl]);
          setTimeout(() => { this.loginButton = 'Log in'; }, 1000)
        },
        error: (data) => {
          this.loginButton = 'Log in';
          throw data;
        }
      });

      this.subscriptions.push(sub);
  }

}
