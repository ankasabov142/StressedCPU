import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidateMatchInputDirective } from './directives/validate-match-input.directive';
import { OrderComponent } from './components/order/order.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [
    ValidateMatchInputDirective,
    OrderComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule
  ],
  exports: [
    ValidateMatchInputDirective,
    OrderComponent
  ]
})
export class SharedModule { }
