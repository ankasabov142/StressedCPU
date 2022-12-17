import { Component, Input } from '@angular/core';
import { ORDER_STATUS } from 'src/app/core/enums/orderStatus';
import IOrder from 'src/app/interfaces/IOrder';


const STATUS_ICON = {
  [ORDER_STATUS.AWAITING_CONFIRMATION.code]: { icon: 'schedule', color: 'gray' },
  [ORDER_STATUS.CONFIRMED.code]: { icon: 'recommend', color: 'orange' },
  [ORDER_STATUS.SENT.code]: { icon: 'local_shipping', color: 'orange' },
  [ORDER_STATUS.FULFILLED.code]: { icon: 'verified', color: 'green' },
  [ORDER_STATUS.CANCELLED.code]: { icon: 'highlight_off', color: 'red' },
  [ORDER_STATUS.RETURNED.code]: { icon: 'currency_exchange', color: 'yellow' },
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  @Input() order!: IOrder;
  @Input() isAdmin: boolean = false;
  isExpanded: boolean = false;


  getStatus(status: number): string {
    const entry = Object.entries(ORDER_STATUS).find(entry => entry[1].code === status);
    return entry ? entry[1].name : ORDER_STATUS.AWAITING_CONFIRMATION.name;
  }
  
  getStatusIcon(status: any): { icon: string, color: string } {
    return STATUS_ICON[status]
      || STATUS_ICON[ORDER_STATUS.AWAITING_CONFIRMATION.code];
  }
}
