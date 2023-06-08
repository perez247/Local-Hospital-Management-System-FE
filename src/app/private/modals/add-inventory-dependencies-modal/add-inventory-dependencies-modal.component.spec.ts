import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInventoryDependenciesModalComponent } from './add-inventory-dependencies-modal.component';

describe('AddInventoryDependenciesModalComponent', () => {
  let component: AddInventoryDependenciesModalComponent;
  let fixture: ComponentFixture<AddInventoryDependenciesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInventoryDependenciesModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInventoryDependenciesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
