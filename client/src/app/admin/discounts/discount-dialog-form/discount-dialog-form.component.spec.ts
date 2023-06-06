import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountDialogFormComponent } from './discount-dialog-form.component';

describe('DiscountDialogFormComponent', () => {
  let component: DiscountDialogFormComponent;
  let fixture: ComponentFixture<DiscountDialogFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscountDialogFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscountDialogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
