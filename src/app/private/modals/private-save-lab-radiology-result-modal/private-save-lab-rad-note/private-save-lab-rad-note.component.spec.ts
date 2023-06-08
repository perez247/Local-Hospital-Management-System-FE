import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateSaveLabRadNoteComponent } from './private-save-lab-rad-note.component';

describe('PrivateSaveLabRadNoteComponent', () => {
  let component: PrivateSaveLabRadNoteComponent;
  let fixture: ComponentFixture<PrivateSaveLabRadNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateSaveLabRadNoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateSaveLabRadNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
