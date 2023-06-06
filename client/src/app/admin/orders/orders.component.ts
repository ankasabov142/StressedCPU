import { Component } from '@angular/core';
import IOrder from 'src/app/interfaces/IOrder';
import { AdminService } from '../admin.service';
import { ORDER_STATUS } from 'src/app/core/enums/orderStatus';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  private _orders?: IOrder[];
  private statuses: number[] = [
    ORDER_STATUS.AWAITING_CONFIRMATION.code,
    ORDER_STATUS.CONFIRMED.code,
    ORDER_STATUS.SENT.code
  ];

  get orders(): IOrder[] | undefined {
    return this._orders;
  }

  get ORDER_STATUS() {
    return ORDER_STATUS;
  }

  constructor(private adminService: AdminService) { }

  private loadOrders(): void {
    this.adminService.getOrders(this.statuses).subscribe({
      next: (value: IOrder[]) => this._orders = value
    });
  }

  ngOnInit(): void {
    this.loadOrders();
  }

  toggleStatus(status: number) {
    const idx = this.statuses.indexOf(status);

    if (idx === -1) {
      this.statuses.push(status);
    } else {
      this.statuses.splice(idx, 1);
    }

    this.loadOrders();
  }
}