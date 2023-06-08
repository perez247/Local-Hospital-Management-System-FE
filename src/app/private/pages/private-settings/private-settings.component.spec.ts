import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateSettingsComponent } from './private-settings.component';

describe('PrivateSettingsComponent', () => {
  let component: PrivateSettingsComponent;
  let fixture: ComponentFixture<PrivateSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
