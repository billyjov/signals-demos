import { Component, input } from '@angular/core';

@Component({
  selector: 'app-item-box',
  imports: [],
  templateUrl: './item-box.component.html',
  styleUrl: './item-box.component.css',
})
export class ItemBoxComponent {
  item = input<{ label: string; id: number }>();
}
