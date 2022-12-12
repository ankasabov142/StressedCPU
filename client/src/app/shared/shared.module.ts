import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidateMatchInputDirective } from './directives/validate-match-input.directive';



@NgModule({
  declarations: [
    ValidateMatchInputDirective
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ValidateMatchInputDirective
  ]
})
export class SharedModule { }
