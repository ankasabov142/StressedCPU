import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  @Input() title: string | null = null;
  @Input() cancelText: string = 'Cancel';
  @Input() submitText: string = 'Submit';

  @Input() cancel: Function = () => this.dialogRef.close();
  @Input() submit: Function = () => this.dialogRef.close();

  constructor(private dialogRef: MatDialogRef<DialogComponent>) { }
}
