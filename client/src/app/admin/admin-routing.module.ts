import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PanelComponent } from './panel/panel.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { OrdersComponent } from './orders/orders.component';
import { GamesComponent } from './games/games.component';
import { CategoriesComponent } from './categories/categories.component';
import { GenresComponent } from './genres/genres.component';
import { TagsComponent } from './tags/tags.component';
import { DiscountsComponent } from './discounts/discounts.component';

const routes: Routes = [
  {
    path: '',
    component: PanelComponent,
    canActivate: [AuthGuard],
    data: {
      isAdmin: true,
      onFailureRedirectUrl: '/profile/auth'
    },
    children: [
      { path: 'orders', component: OrdersComponent },
      { path: 'games', component: GamesComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'genres', component: GenresComponent },
      { path: 'tags', component: TagsComponent },
      { path: 'discounts', component: DiscountsComponent },
      { path: '**', redirectTo: 'orders' }
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
