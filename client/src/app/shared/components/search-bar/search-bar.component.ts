import { Component, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  @Output() queryEmitter: EventEmitter<string> = new EventEmitter();
  @Input() label!: string;
  @Input() placeholder: string = this.label;

  emitQuery(query: string): void {
    this.queryEmitter.emit(query);
  }
}
