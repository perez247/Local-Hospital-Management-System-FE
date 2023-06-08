import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedViewImageComponent } from './shared-view-image.component';

describe('SharedViewImageComponent', () => {
  let component: SharedViewImageComponent;
  let fixture: ComponentFixture<SharedViewImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedViewImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedViewImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
