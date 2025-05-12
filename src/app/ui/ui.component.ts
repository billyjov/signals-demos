import {
  ChangeDetectionStrategy,
  Component,
  computed,
  OnInit,
  signal,
} from '@angular/core';
import { BehaviorSubject, combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-ui',
  imports: [],
  templateUrl: './ui.component.html',
  styleUrl: './ui.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiComponent implements OnInit {
  // Properties
  a = 10;
  b = 20;
  c = this.a + this.b;

  // RxJS
  a$ = new BehaviorSubject(10);
  b$ = new BehaviorSubject(20);

  c$ = combineLatest([this.a$, this.b$]).pipe(map(([a, b]) => a + b));
  cValue = 0;

  // Signals
  aSignal = signal(10);
  bSignal = signal(20);
  cSignal = computed(() => this.aSignal() + this.bSignal());

  ngOnInit(): void {
    // RxJS
    this.c$.subscribe((value) => {
      this.cValue = value;
      console.log('Value of C$: ', value);
    });
  }

  updateValue(): void {
    this.b = 30;
    console.log('Value of C: ', this.c);
    console.log('Value of A: ', this.a);
  }

  updateRxjsValue(): void {
    this.b$.next(30);
  }

  updateSignalValue(): void {
    // Signals
    this.bSignal.set(30);
    console.log('Value of CSignal: ', this.cSignal());
    console.log('Value of ASignal: ', this.aSignal());
  }
}
