import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Input, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ChipAutocompleteItem } from '../../util/types';

@Component({
  selector: 'app-chips-autocomplete-input',
  templateUrl: './chips-autocomplete-input.component.html',
  styleUrls: ['./chips-autocomplete-input.component.css']
})
export class ChipsAutocompleteInputComponent {
  @Input() label: string = 'Value'
  @Input() placeholder: string = this.label;
  @Input() allItems: ChipAutocompleteItem[] = [];
  @Input() items: ChipAutocompleteItem[] = [];
  @Input() suffixIcon: string | null = null;
  @Output() itemEmitter: EventEmitter<ChipAutocompleteItem[]> = new EventEmitter();

  separatorKeysCodes: number[] = [ENTER, COMMA];
  control = new FormControl('');
  filteredItems!: Observable<ChipAutocompleteItem[]>;

  @ViewChild('input') input!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {


    this.filteredItems = this.control.valueChanges.pipe(
      startWith(null),
      map((item: any) => {
        if (item && typeof (item) === 'object') {
          return item.name;
        }
        return item;
      }),
      map((itemName: string | null) => { return (itemName ? this.filter(itemName) : this.allItems.slice()) }),
    );
  }

  add(event: MatChipInputEvent): void {
    const item = this.getItemFromName((event.value || '').trim());

    if (item && !this.items.some(i => i.name === item.name)) {
      this.items.push(item);
      this.emit();
    }

    event.chipInput!.clear();
    this.control.setValue(null);
  }

  remove(item: ChipAutocompleteItem): void {
    const index = this.items.indexOf(item);

    if (index >= 0) {
      this.items.splice(index, 1);
      this.emit();
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const item = this.getItemFromName(event.option.viewValue);

    if (!item) {
      return;
    }

    this.input.nativeElement.value = '';
    this.control.setValue(null);

    if (!this.items.some(i => i.name === item.name)) {
      this.items.push(item);
      this.emit();
    }
  }

  private filter(value: string): ChipAutocompleteItem[] {
    const filterValue = value ? value.toLocaleLowerCase() : '';
    return this.allItems.filter(item => item.name.toLowerCase().includes(filterValue));
  }

  private getItemFromName(name: string): ChipAutocompleteItem | null {
    return this.allItems.find(i => i.name === name) || null;
  }

  private emit(): void {
    this.itemEmitter.emit(this.items);
  }
}
