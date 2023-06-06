import { Component } from '@angular/core';
import IOrder from 'src/app/interfaces/IOrder';
import { UserService } from '../../user.service';


@Component({
  selector: 'app-profile-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  private _orders?: IOrder[];

  get orders(): IOrder[] | undefined {
    return this._orders;
  }

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserOrders().subscribe({
      next: (newOrders: IOrder[]) => {
        this._orders = newOrders;
      }
    })
  }
}
