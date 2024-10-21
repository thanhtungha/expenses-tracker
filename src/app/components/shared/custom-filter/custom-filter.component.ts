import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-custom-filter',
  templateUrl: './custom-filter.component.html',
})
export class CustomFilterComponent implements OnInit {
  @Input() initValue = '';
  @Input() filterOptions: string[] = [];
  @Output() onFilterSelected = new EventEmitter<string>();

  selectedFilter: string = '';

  ngOnInit(): void {
    this.selectedFilter = this.filterOptions[0];
  }
  onFilterChange() {
    console.log('Selected filter:', this.selectedFilter);
    this.onFilterSelected.emit(this.selectedFilter);
  }
}
