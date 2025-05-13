import { Component, effect, signal } from '@angular/core';
import { ItemBoxComponent } from './item-box/item-box.component';

@Component({
  selector: 'app-performance',
  imports: [ItemBoxComponent],
  templateUrl: './performance.component.html',
  styleUrl: './performance.component.css',
})
export class PerformanceComponent {
  // ⚠️ Ein Signal für jedes Item
  eff = effect(() => {
    console.log('Effect triggered');
  });

  items = Array.from({ length: 1000 }, (_, i) =>
    signal({
      label: `Item ${i}`,
      id: i,
    })
  );

  updateItem(index: number) {
    const old = this.items[index]();
    this.items[index].set({ ...old, label: `Item ${index} - Updated` });
  }
}
