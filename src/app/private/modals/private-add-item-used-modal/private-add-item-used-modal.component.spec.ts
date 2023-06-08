import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateAddItemUsedModalComponent } from './private-add-item-used-modal.component';

describe('PrivateAddItemUsedModalComponent', () => {
  let component: PrivateAddItemUsedModalComponent;
  let fixture: ComponentFixture<PrivateAddItemUsedModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateAddItemUsedModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateAddItemUsedModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
