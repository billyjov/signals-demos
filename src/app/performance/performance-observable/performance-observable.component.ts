import { Component, OnInit, Signal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, interval, Observable, Subject } from 'rxjs';
import { ItemBoxComponent } from '../item-box/item-box.component';
import { ChildObsComponent } from './child-obs/child-obs.component';

@Component({
  selector: 'app-performance-observable',
  imports: [ItemBoxComponent, ChildObsComponent],
  templateUrl: './performance-observable.component.html',
  styleUrl: './performance-observable.component.css',
})
export class PerformanceObservableComponent implements OnInit {
  // Counter to signal in injection context
  // Counter Step-1
  counter$!: Observable<number>;
  // counter = toSignal(this.counter$);
  counter: Signal<number> = signal(0);

  subject: BehaviorSubject<number> = new BehaviorSubject(0);
  subjectSignal = toSignal(this.subject, {
    initialValue: 0,
    // Important to keep last seen valid value
    // rejectErrors: true,
  });

  isChildVisible = signal(false);
  hasNewValueVisible = signal(false);

  toggleChild(): void {
    this.isChildVisible.update((prev) => !prev);
  }

  increment(): void {
    this.subject.next(Math.floor(Math.random() * 100));
  }

  createError(): void {
    this.subject.error(new Error('Error'));
  }

  toggleValueVisibility(): void {
    this.hasNewValueVisible.update((prev) => !prev);
  }

  // Items as array
  private items$ = new BehaviorSubject<{ label: string; id: number }[]>(
    Array.from({ length: 1000 }, (_, i) => {
      return {
        label: `Item ${i}`,
        id: i,
      };
    })
  );

  // Nur ein Signal für das gesamte Array
  signalItems = toSignal(this.items$, { initialValue: [] });

  ngOnInit(): void {
    // Counter Step-2
    // this.counter$ = interval(1000);
    // this.counter = toSignal(this.counter$, {
    //   initialValue: 0,
    //   manualCleanup: true,
    // });
    console.log('ngOnInit');
  }

  updateItem(index: number) {
    const arr = [...this.items$.value];
    const old = arr[index];
    arr[index] = { ...old, label: `Item ${index} - Updated` };
    this.items$.next(arr);
  }
}
