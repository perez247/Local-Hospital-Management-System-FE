import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateBillingSettingComponent } from './private-billing-setting.component';

describe('PrivateBillingSettingComponent', () => {
  let component: PrivateBillingSettingComponent;
  let fixture: ComponentFixture<PrivateBillingSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateBillingSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateBillingSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
