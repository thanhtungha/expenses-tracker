import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-box',
  templateUrl: './custom-box.component.html',
})
export class CustomBoxComponent {
  @Input() title: string = '';
  @Input() value: string = '';
}
