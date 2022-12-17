import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { GameRoutingModule } from './game-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    HomeComponent,
    ProductsListComponent
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class GameModule { }
