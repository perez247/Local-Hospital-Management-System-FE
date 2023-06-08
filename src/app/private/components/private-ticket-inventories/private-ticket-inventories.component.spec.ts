import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateTicketInventoriesComponent } from './private-ticket-inventories.component';

describe('PrivateTicketInventoriesComponent', () => {
  let component: PrivateTicketInventoriesComponent;
  let fixture: ComponentFixture<PrivateTicketInventoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateTicketInventoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateTicketInventoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
