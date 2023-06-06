import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameFormDialogComponent } from './game-form-dialog.component';

describe('GameFormDialogComponent', () => {
  let component: GameFormDialogComponent;
  let fixture: ComponentFixture<GameFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameFormDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
