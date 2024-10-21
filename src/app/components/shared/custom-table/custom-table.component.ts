import { Component } from '@angular/core';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
})
export class CustomTableComponent {
  tableData = [
    {
      column1: 'Data 1-1',
      column2: 'Data 1-2',
      column3: 'Data 1-3',
      column4: 'Data 1-4',
    },
    {
      column1: 'Data 2-1',
      column2: 'Data 2-2',
      column3: 'Data 2-3',
      column4: 'Data 2-4',
    },
    {
      column1: 'Data 3-1',
      column2: 'Data 3-2',
      column3: 'Data 3-3',
      column4: 'Data 3-4',
    },
    {
      column1: 'Data 3-1',
      column2: 'Data 3-2',
      column3: 'Data 3-3',
      column4: 'Data 3-4',
    },
  ];
}
