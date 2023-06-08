import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateInventoryDependenciesComponent } from './private-inventory-dependencies.component';

describe('PrivateInventoryDependenciesComponent', () => {
  let component: PrivateInventoryDependenciesComponent;
  let fixture: ComponentFixture<PrivateInventoryDependenciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateInventoryDependenciesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateInventoryDependenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
