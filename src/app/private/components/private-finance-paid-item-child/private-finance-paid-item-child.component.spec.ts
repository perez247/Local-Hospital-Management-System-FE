import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateFinancePaidItemChildComponent } from './private-finance-paid-item-child.component';

describe('PrivateFinancePaidItemChildComponent', () => {
  let component: PrivateFinancePaidItemChildComponent;
  let fixture: ComponentFixture<PrivateFinancePaidItemChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateFinancePaidItemChildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateFinancePaidItemChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
