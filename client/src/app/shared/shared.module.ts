import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidateMatchInputDirective } from './directives/validate-match-input.directive';

import { OrderComponent } from './components/order/order.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { AddBtnComponent } from './components/add-btn/add-btn.component';
import { ChipsAutocompleteInputComponent } from './components/chips-autocomplete-input/chips-autocomplete-input.component';


import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { ChipsInputComponent } from './components/chips-input/chips-input.component';
import { ValidateUrlDirective } from './directives/validate-url.directive';
import { ModalLoaderComponent } from './components/modal-loader/modal-loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DialogComponent } from './components/dialog/dialog.component';
import { DialogFormComponent } from './components/dialog-form/dialog-form.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    ValidateMatchInputDirective,
    OrderComponent,
    SearchBarComponent,
    AddBtnComponent,
    ChipsAutocompleteInputComponent,
    ChipsInputComponent,
    ValidateUrlDirective,
    ModalLoaderComponent,
    DialogComponent,
    DialogFormComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatOptionModule,
    MatAutocompleteModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ],
  exports: [
    ValidateMatchInputDirective,
    ValidateUrlDirective,
    OrderComponent,
    SearchBarComponent,
    AddBtnComponent,
    ChipsAutocompleteInputComponent,
    ChipsInputComponent,
    ModalLoaderComponent,
    DialogComponent,
    DialogFormComponent
  ]
})
export class SharedModule { }
