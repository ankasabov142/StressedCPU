import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminService } from 'src/app/admin/admin.service';
import { ORDER_ACTION, ORDER_STATUS } from 'src/app/core/enums/orderStatus';
import IOrder from 'src/app/interfaces/IOrder';
import { UserService } from 'src/app/user/user.service';


const STATUS_ICON = {
  [ORDER_STATUS.AWAITING_CONFIRMATION.code]: { icon: 'schedule', color: 'gray' },
  [ORDER_STATUS.CONFIRMED.code]: { icon: 'recommend', color: 'orange' },
  [ORDER_STATUS.SENT.code]: { icon: 'local_shipping', color: 'orange' },
  [ORDER_STATUS.FULFILLED.code]: { icon: 'verified', color: 'green' },
  [ORDER_STATUS.CANCELLED.code]: { icon: 'highlight_off', color: 'red' },
  [ORDER_STATUS.RETURNED.code]: { icon: 'currency_exchange', color: 'yellow' },
}

type MenuOption = {
  code: number;
  name: string;
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  @Input() order!: IOrder;
  @Input() isAdmin: boolean = false;
  menuOptions: MenuOption[] | null = null;
  isExpanded: boolean = false;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    if (this.isAdmin) {
      this.menuOptions = this.getMenuOptions(this.order.status);
    }
  }

  getStatus(status: number): string {
    const entry = Object.entries(ORDER_STATUS).find(entry => entry[1].code === status);
    return entry ? entry[1].name : ORDER_STATUS.AWAITING_CONFIRMATION.name;
  }

  getStatusIcon(status: any): { icon: string, color: string } {
    return STATUS_ICON[status]
      || STATUS_ICON[ORDER_STATUS.AWAITING_CONFIRMATION.code];
  }

  getMenuOptionAction(statusCode: number): Function {
    return {
      [ORDER_STATUS.CONFIRMED.code]: () => this.confirmOrder(),
      [ORDER_STATUS.SENT.code]: () => this.sendOrder(),
      [ORDER_STATUS.FULFILLED.code]: () => this.fulfillOrder(),
      [ORDER_STATUS.CANCELLED.code]: () => this.cancelOrder(),
      [ORDER_STATUS.RETURNED.code]: () => this.returnOrder()
    }[statusCode] || (() => alert('An error occure. Please restart page.'));
  }

  
  private handleOrderStatusChange(serviceFn: Function, statusCode: number): void {
    serviceFn().subscribe({
      next: (statusDidUpdate: boolean) => {
        if (statusDidUpdate) {
          this.order.status = statusCode;
          this.menuOptions = this.getMenuOptions(statusCode);
        }
      }
    })
  }

  private confirmOrder() {
    this.handleOrderStatusChange(() => this.adminService.confirmOrder(this.order._id), ORDER_STATUS.CONFIRMED.code);
  }

  private sendOrder() {
    this.handleOrderStatusChange(() => this.adminService.sendOrder(this.order._id), ORDER_STATUS.SENT.code);
  }

  private fulfillOrder() {
    this.handleOrderStatusChange(() => this.adminService.fulfillOrder(this.order._id), ORDER_STATUS.FULFILLED.code);
  }

  private cancelOrder() {
    this.handleOrderStatusChange(() => this.adminService.cancelOrder(this.order._id), ORDER_STATUS.CANCELLED.code);
  }

  private returnOrder() {
    this.handleOrderStatusChange(() => this.adminService.returnOrder(this.order._id), ORDER_STATUS.RETURNED.code);
  }



  private getMenuOrderOption(statusCode: number) {
    const name = ORDER_ACTION[statusCode];

    return { name, code: statusCode };
  }

  private getConfirmOrderOption() {
    return this.getMenuOrderOption(ORDER_STATUS.CONFIRMED.code);
  }

  private getSendOrderOption() {
    return this.getMenuOrderOption(ORDER_STATUS.SENT.code);
  }

  private getFulfillOrderOption() {
    return this.getMenuOrderOption(ORDER_STATUS.FULFILLED.code);
  }

  private getCancelOrderOption() {
    return this.getMenuOrderOption(ORDER_STATUS.CANCELLED.code);
  }

  private getReturnOrderOption() {
    return this.getMenuOrderOption(ORDER_STATUS.RETURNED.code);
  }

  private getMenuOptions(orderStatus: number): MenuOption[] | null {
    switch (orderStatus) {
      case ORDER_STATUS.AWAITING_CONFIRMATION.code:
        return [
          this.getConfirmOrderOption(),
          this.getCancelOrderOption()
        ];

      case ORDER_STATUS.CONFIRMED.code:
        return [
          this.getSendOrderOption(),
          this.getCancelOrderOption()
        ];

      case ORDER_STATUS.SENT.code:
        return [
          this.getFulfillOrderOption()
        ];

      case ORDER_STATUS.FULFILLED.code:
        return [
          this.getReturnOrderOption()
        ];

      default: return null;
    }
  }
}