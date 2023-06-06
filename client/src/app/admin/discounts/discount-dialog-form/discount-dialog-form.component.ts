import { Component, Inject } from '@angular/core';
import { FormBuilder, NgModel, Validators } from '@angular/forms';
import { getError } from 'src/app/shared/util/functions';

import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import IDiscount from 'src/app/interfaces/IDiscount';
@Component({
  selector: 'app-discount-dialog-form',
  templateUrl: './discount-dialog-form.component.html',
  styleUrls: ['./discount-dialog-form.component.css']
})
export class DiscountDialogFormComponent {
  title: string;
  submit: Function;

  form = this.fb.group({
    code: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
    percentage: ['', Validators.compose([Validators.required, Validators.min(0), Validators.max(100)])],
    isPromoCode: [false, Validators.required]
  })

  get formControl() {
    return this.form.controls;
  }

  constructor(
    public dialogRef: MatDialogRef<DiscountDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, submit: Function, body?: IDiscount },
    private fb: FormBuilder
  ) {
    this.title = data.title;
    this.submit = data.submit;

    if (data.body) {
      this.formControl.code.setValue(data.body.code);
      this.formControl.percentage.setValue(data.body.percentage.toString());
      this.formControl.isPromoCode.setValue(Boolean(data.body.isPromoCode));
    }
  }

  getCodeError(errors: any): string {
    return getError(errors, 'Code')
  }

  getPercentageError(errors: any): string {
    return getError(errors, 'Discount percentage')
  }
}
