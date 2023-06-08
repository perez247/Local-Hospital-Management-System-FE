import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedToastComponent } from './shared-toast.component';

describe('SharedToastComponent', () => {
  let component: SharedToastComponent;
  let fixture: ComponentFixture<SharedToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedToastComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
