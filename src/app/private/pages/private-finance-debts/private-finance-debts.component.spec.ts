import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateFinanceDebtsComponent } from './private-finance-debts.component';

describe('PrivateFinanceDebtsComponent', () => {
  let component: PrivateFinanceDebtsComponent;
  let fixture: ComponentFixture<PrivateFinanceDebtsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateFinanceDebtsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateFinanceDebtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
