import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, finalize } from 'rxjs';
import { AppUser, UserFilter } from '../../core/models/app-user';
import { AppPagination, PaginationRequest, PaginationResponse } from '../../core/models/pagination';
import { UserService } from '../../services/api/user/user.service';
import { SharedUtilityComponent } from '../shared-utility/shared-utility.component';

@Component({
  selector: 'app-shared-user-autocomplete',
  templateUrl: './shared-user-autocomplete.component.html',
  styleUrls: ['./shared-user-autocomplete.component.scss']
})
export class SharedUserAutocompleteComponent  extends SharedUtilityComponent implements OnInit, OnChanges {

  @Input() searchWord?: string;
  @Input() userType?: string;
  @Input() roles?: string[];
  @ViewChild('myDrop') title: any;
  @Output() selected = new EventEmitter<AppUser>();

  private subject$ = new Subject<string>();

  userList: AppUser[] = [];
  appPagination = new AppPagination();
  filter = new UserFilter('staff');
  paginationRequest = new PaginationRequest<UserFilter>(this.appPagination, this.filter);
  paginationResponse = new PaginationResponse<AppUser[]>();

  disableSearch = false;

  constructor(
    private userService: UserService,
  ) {
    super();
  }

  override ngOnInit(): void {
  this.setFilter();
  this.filter.roles = this.roles || [];
  this.paginationRequest = new PaginationRequest<UserFilter>(this.appPagination, this.filter);
    this.checkForChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (this.disableSearch) {
      return;
    }

    const currentWord = changes['searchWord']['currentValue'];

    this.subject$.next(currentWord)
  }

  checkForChanges(): void {
    const sub = this.subject$
    .pipe(
      debounceTime(1000),
      distinctUntilChanged()
      )
    .subscribe({
      next: (data) => {
        if (!data) { return; }
        if (data.length <= 2) { return; }
        this.filter.name = data;
        this.paginationRequest = new PaginationRequest<UserFilter>(this.appPagination, this.filter);
        this.getUserByName();
      }
    });

    this.subscriptions.push(sub);
  }

  getUserByName(): void {
    this.title.open();
    this.isLoading = true;
    const sub = this.userService.getUsers(this.paginationRequest)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {
          this.paginationResponse = data;
          this.userList = data.result ?? [];
          this.title.open();
        },
        error: (error) => {
          throw error;
        }
      });
  }

  selectedStaff(selectedStaff: AppUser): void {
    selectedStaff.otherName = selectedStaff.otherName || '';
    this.selected.emit(selectedStaff);
    this.userList = [];

    this.disableSearch = true;
    setTimeout(() => {
      this.disableSearch = false;
    }, 1000);
  }

  private setFilter(): void {
    switch (this.userType) {
      case 'staff':
        this.filter = new UserFilter('staff');
        break;
      case 'patient':
        this.filter = new UserFilter('patient');
        break;
      case 'company':
        this.filter = new UserFilter('company');
        break;

      default:
          this.filter = new UserFilter('all');
        break;
    }
  }

}
