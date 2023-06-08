import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateDebtPaymentModalsComponent } from './private-debt-payment-modals.component';

describe('PrivateDebtPaymentModalsComponent', () => {
  let component: PrivateDebtPaymentModalsComponent;
  let fixture: ComponentFixture<PrivateDebtPaymentModalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateDebtPaymentModalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateDebtPaymentModalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
