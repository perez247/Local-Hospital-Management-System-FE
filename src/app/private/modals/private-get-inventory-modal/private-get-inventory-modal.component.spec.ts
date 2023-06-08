import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateGetInventoryModalComponent } from './private-get-inventory-modal.component';

describe('PrivateGetInventoryModalComponent', () => {
  let component: PrivateGetInventoryModalComponent;
  let fixture: ComponentFixture<PrivateGetInventoryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateGetInventoryModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateGetInventoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
