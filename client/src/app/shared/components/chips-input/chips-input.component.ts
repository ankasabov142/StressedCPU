import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-chips-input',
  templateUrl: './chips-input.component.html',
  styleUrls: ['./chips-input.component.css']
})
export class ChipsInputComponent {
  @Input() label: string = 'Value'
  @Input() placeholder: string = this.label;
  @Input() suffixIcon: string | null = null;
  @Input() items: string[] = [];
  @Output() itemEmitter: EventEmitter<string[]> = new EventEmitter();

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.items.push(value);
    }

    this.emit();

    event.chipInput!.clear();
  }

  remove(item: string): void {
    const index = this.items.indexOf(item);

    if (index >= 0) {
      this.items.splice(index, 1);
    }

    this.emit();
  }

  edit(item: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    if (!value) {
      this.remove(item);
      this.emit();
      return;
    }

    const index = this.items.indexOf(item);
    if (index >= 0) {
      this.items[index] = value;
    }

    this.emit();
  }

  private emit(): void {
    this.itemEmitter.emit(this.items);
  }
}