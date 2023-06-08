import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivatePreviousTicketsComponent } from './private-previous-tickets.component';

describe('PrivatePreviousTicketsComponent', () => {
  let component: PrivatePreviousTicketsComponent;
  let fixture: ComponentFixture<PrivatePreviousTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivatePreviousTicketsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivatePreviousTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
