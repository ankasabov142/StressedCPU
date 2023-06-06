import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipsAutocompleteInputComponent } from './chips-autocomplete-input.component';

describe('ChipsAutocompleteInputComponent', () => {
  let component: ChipsAutocompleteInputComponent;
  let fixture: ComponentFixture<ChipsAutocompleteInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChipsAutocompleteInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChipsAutocompleteInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
