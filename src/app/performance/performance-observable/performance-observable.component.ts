import { Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject } from 'rxjs';
import { ItemBoxComponent } from '../item-box/item-box.component';

@Component({
  selector: 'app-performance-observable',
  imports: [ItemBoxComponent],
  templateUrl: './performance-observable.component.html',
  styleUrl: './performance-observable.component.css'
})
export class PerformanceObservableComponent {
 private items$ = new BehaviorSubject<{ label: string; id: number }[]>(
   Array.from({ length: 1000 }, (_, i) => {
      return {
        label: `Item ${i}`,
        id: i,
      };
    })
  );

  // ⚠️ Nur ein Signal für das gesamte Array
  signalItems = toSignal(this.items$, { initialValue: [] });

  updateItem(index: number) {
    const arr = [...this.items$.value];
    const old = arr[index];
    arr[index] = { ...old, label: `Item ${index} - Updated` };
    this.items$.next(arr);
  }
}
