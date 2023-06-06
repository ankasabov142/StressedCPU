import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-form',
  templateUrl: './dialog-form.component.html',
  styleUrls: ['./dialog-form.component.css']
})
export class DialogFormComponent {
  @Input() title: string | null = null;
  @Input() cancelText: string = 'Cancel';
  @Input() submitText: string = 'Submit';
  @Input() formGroup!: FormGroup;

  @Input() cancel: Function = () => this.dialogRef.close();
  @Input() submit: Function = () => this.dialogRef.close();

  constructor(private dialogRef: MatDialogRef<DialogFormComponent>) { }
}
