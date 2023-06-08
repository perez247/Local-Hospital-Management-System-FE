import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateSaveLabRadiologyResultModalComponent } from './private-save-lab-radiology-result-modal.component';

describe('PrivateSaveLabRadiologyResultModalComponent', () => {
  let component: PrivateSaveLabRadiologyResultModalComponent;
  let fixture: ComponentFixture<PrivateSaveLabRadiologyResultModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateSaveLabRadiologyResultModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateSaveLabRadiologyResultModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
