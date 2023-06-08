import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateFinancePaidItemComponent } from './private-finance-paid-item.component';

describe('PrivateFinancePaidItemComponent', () => {
  let component: PrivateFinancePaidItemComponent;
  let fixture: ComponentFixture<PrivateFinancePaidItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateFinancePaidItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateFinancePaidItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
