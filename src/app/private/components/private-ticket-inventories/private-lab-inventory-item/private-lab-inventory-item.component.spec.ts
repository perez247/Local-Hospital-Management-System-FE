import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateLabInventoryItemComponent } from './private-lab-inventory-item.component';

describe('PrivateLabInventoryItemComponent', () => {
  let component: PrivateLabInventoryItemComponent;
  let fixture: ComponentFixture<PrivateLabInventoryItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateLabInventoryItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateLabInventoryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
