import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateFinancePaidComponent } from './private-finance-paid.component';

describe('PrivateFinancePaidComponent', () => {
  let component: PrivateFinancePaidComponent;
  let fixture: ComponentFixture<PrivateFinancePaidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateFinancePaidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateFinancePaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
