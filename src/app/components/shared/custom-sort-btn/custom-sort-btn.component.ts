import { Component } from '@angular/core';

@Component({
  selector: 'app-custom-sort-btn',
  templateUrl: './custom-sort-btn.component.html',
})
export class CustomSortBtnComponent {
  sortAscending: boolean = true;

  toggleSort() {
    this.sortAscending = !this.sortAscending;
  }
}
