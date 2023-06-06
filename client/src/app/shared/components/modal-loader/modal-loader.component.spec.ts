import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLoaderComponent } from './modal-loader.component';

describe('ModalLoaderComponent', () => {
  let component: ModalLoaderComponent;
  let fixture: ComponentFixture<ModalLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalLoaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
