import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateFilterFinanceDebtsModalComponent } from './private-filter-finance-debts-modal.component';

describe('PrivateFilterFinanceDebtsModalComponent', () => {
  let component: PrivateFilterFinanceDebtsModalComponent;
  let fixture: ComponentFixture<PrivateFilterFinanceDebtsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateFilterFinanceDebtsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateFilterFinanceDebtsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
