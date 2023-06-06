import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import IDiscount from 'src/app/interfaces/IDiscount';
import { AdminService } from '../admin.service';
import { DiscountDialogFormComponent } from './discount-dialog-form/discount-dialog-form.component';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.css']
})
export class DiscountsComponent {
  get discounts(): IDiscount[] | undefined {
    return this.adminService.discounts;
  }

  constructor(public dialog: MatDialog, private adminService: AdminService) { }

  openNewDiscount(): void {
    this.dialog.open(DiscountDialogFormComponent, {
      data: {
        title: 'New Discount',
        submit: (form: any) => this.postDiscount(form.value)
      }
    });
  }
  openEditDiscount(discount: IDiscount): void {
    this.dialog.open(DiscountDialogFormComponent, {
      data: {
        title: 'Edit ' + this.toString(discount),
        submit: (form: any) => this.postDiscount(form.value),
        body: discount
      }
    })
  }

  postDiscount(body: IDiscount): void {
    this.adminService.postDiscount(body);
  }

  editDiscount(discountId: string, body: IDiscount): void {
    this.adminService.editDiscount(discountId, body);
  }

  deleteDiscount(discountId: string): void {
    this.adminService.deleteDiscount(discountId);
  }

  toString(discount: IDiscount): string {
    return `${discount.isPromoCode ? 'Promo Code' : 'Discount'} "${discount.code}" for ${discount.percentage}% #${discount._id}`
  }
}
