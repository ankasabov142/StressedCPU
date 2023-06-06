import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';

import { PanelComponent } from './panel/panel.component';
import { GamesComponent } from './games/games.component';
import { DiscountsComponent } from './discounts/discounts.component';
import { GenresComponent } from './genres/genres.component';
import { TagsComponent } from './tags/tags.component';
import { CategoriesComponent } from './categories/categories.component';
import { OrdersComponent } from './orders/orders.component';
import { GameFormDialogComponent } from './games/game-form-dialog/game-form-dialog.component';
import { DialogFormNameComponent } from './dialog-form-name/dialog-form-name.component';
import { DiscountDialogFormComponent } from './discounts/discount-dialog-form/discount-dialog-form.component';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [
    PanelComponent,
    GamesComponent,
    DiscountsComponent,
    GenresComponent,
    TagsComponent,
    CategoriesComponent,
    OrdersComponent,
    GameFormDialogComponent,
    DialogFormNameComponent,
    DiscountDialogFormComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatMenuModule,
    MatTooltipModule
  ],
})
export class AdminModule { }
