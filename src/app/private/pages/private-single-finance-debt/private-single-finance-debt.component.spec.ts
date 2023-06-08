import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateSingleFinanceDebtComponent } from './private-single-finance-debt.component';

describe('PrivateSingleFinanceDebtComponent', () => {
  let component: PrivateSingleFinanceDebtComponent;
  let fixture: ComponentFixture<PrivateSingleFinanceDebtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateSingleFinanceDebtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateSingleFinanceDebtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
