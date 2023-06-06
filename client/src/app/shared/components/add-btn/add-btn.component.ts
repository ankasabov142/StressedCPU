import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-add-btn',
  templateUrl: './add-btn.component.html',
  styleUrls: ['./add-btn.component.css']
})
export class AddBtnComponent {
  @Input() icon: string = 'add';
  @Input() color: string = 'warn';
}
