import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateSaveLabRadProofComponent } from './private-save-lab-rad-proof.component';

describe('PrivateSaveLabRadProofComponent', () => {
  let component: PrivateSaveLabRadProofComponent;
  let fixture: ComponentFixture<PrivateSaveLabRadProofComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateSaveLabRadProofComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateSaveLabRadProofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
