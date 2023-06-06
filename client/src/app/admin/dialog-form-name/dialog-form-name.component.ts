import { Component, Inject } from '@angular/core';
import { FormBuilder, NgModel, Validators } from '@angular/forms';
import { getError } from 'src/app/shared/util/functions';

import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-form-name',
  templateUrl: './dialog-form-name.component.html'
})
export class DialogFormNameComponent {
  title: string;
  submit: Function;
  suffixIcon: string;

  form = this.fb.group({
    name: ['', Validators.compose([Validators.required, Validators.maxLength(50)])]
  })

  get formControl() {
    return this.form.controls;
  }

  get console() {
    return console;
  }

  constructor(
    public dialogRef: MatDialogRef<DialogFormNameComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, submit: Function, suffixIcon: string, value?: string },
    private fb: FormBuilder
  ) {
    this.title = data.title;
    this.submit = data.submit;
    this.suffixIcon = data.suffixIcon;

    if (data.value) {
      this.formControl.name.setValue(data.value);
    }
  }

  getNameError(errors: any): string {
    this.console.dir(errors)
    return getError(errors, 'Name')
  }
}
