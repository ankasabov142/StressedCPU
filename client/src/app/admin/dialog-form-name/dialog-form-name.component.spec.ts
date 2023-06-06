import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFormNameComponent } from './dialog-form-name.component';

describe('DialogFormNameComponent', () => {
  let component: DialogFormNameComponent;
  let fixture: ComponentFixture<DialogFormNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogFormNameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogFormNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
