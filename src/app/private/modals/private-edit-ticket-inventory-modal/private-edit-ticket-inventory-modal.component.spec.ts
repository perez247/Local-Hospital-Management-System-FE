import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateEditTicketInventoryModalComponent } from './private-edit-ticket-inventory-modal.component';

describe('PrivateEditTicketInventoryModalComponent', () => {
  let component: PrivateEditTicketInventoryModalComponent;
  let fixture: ComponentFixture<PrivateEditTicketInventoryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateEditTicketInventoryModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateEditTicketInventoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
