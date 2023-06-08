import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateSingleFinancePaidComponent } from './private-single-finance-paid.component';

describe('PrivateSingleFinancePaidComponent', () => {
  let component: PrivateSingleFinancePaidComponent;
  let fixture: ComponentFixture<PrivateSingleFinancePaidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateSingleFinancePaidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateSingleFinancePaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
