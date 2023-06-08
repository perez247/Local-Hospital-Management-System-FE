import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivatePharmacyInventoryItemComponent } from './private-pharmacy-inventory-item.component';

describe('PrivatePharmacyInventoryItemComponent', () => {
  let component: PrivatePharmacyInventoryItemComponent;
  let fixture: ComponentFixture<PrivatePharmacyInventoryItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivatePharmacyInventoryItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivatePharmacyInventoryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
