import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { AuthComponent } from './auth/auth.component';
import { LogoutComponent } from './logout/logout.component';
import { AddressesComponent } from './profile/addresses/addresses.component';
import { InfoComponent } from './profile/info/info.component';
import { OrdersComponent } from './profile/orders/orders.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [AuthGuard],
    data: {
      isAuth: false,
      onFailureRedirectUrl: '/profile'
    }
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [AuthGuard],
    data: {
      isAuth: true,
      onFailureRedirectUrl: '/profile/auth'
    }
  },
  {
    path: '',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: {
      isAuth: true,
      onFailureRedirectUrl: '/profile/auth'
    },
    children: [
      { path: 'info', component: InfoComponent },
      { path: 'addresses', component: AddressesComponent },
      { path: 'orders', component: OrdersComponent },
      { path: '**', redirectTo: 'info' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
