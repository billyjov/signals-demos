import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
  effect,
} from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { User } from '../models/user';

@Component({
  selector: 'app-ui',
  imports: [],
  templateUrl: './ui.component.html',
  styleUrl: './ui.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiComponent implements OnInit {
  // Signal != Observable
  // signal1 = signal(0);
  // subject1 = new BehaviorSubject(0);
  // eff1 = effect(() => {
  //   console.log('Signal1: ', this.signal1());
  // });
  // ==============

  //Counter
  count = 0;
  // counterSignal = signal(0);

  // Properties
  a = 10;
  b = 20;
  c = this.a + this.b;

  // RxJS
  a$ = new BehaviorSubject(10);
  b$ = new BehaviorSubject(20);

  c$ = combineLatest([this.a$, this.b$]).pipe(map(([a, b]) => a + b));
  cValue = 0;

  users: User[] = [];
  private http = inject(HttpClient);

  // Signals
  aSignal = signal(10);
  bSignal = signal(20);
  cSignal = computed(() => this.aSignal() + this.bSignal());

  ngOnInit(): void {

    // this.subject1.subscribe((value) => {
    //   console.log('Subject1: ', value);
    // });

    this.getUsers().subscribe((data) => {
      this.users = data;
      // console.log('Users: ', this.users);
    });

    // counter
    setInterval(() => {
      this.count++;
      // this.counterSignal.update((prev) => prev + 1);
      // console.log('Count: ', this.count);
      // console.log('CounterSignal: ', this.counterSignal());
    }, 1000);

    // RxJS
    this.c$.subscribe((value) => {
      this.cValue = value;
      console.log('Value of C$: ', value);
    });
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users');
  }

  triggerCounter(): void {
    console.log('Count: ', this.count);
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

  // Check for emit value
  // changeSignalValue(): void {
  //   this.signal1.set(10);
  //   this.signal1.set(20);
  //   this.signal1.set(30);
  // }

  // changeObservableValue(): void {
  //   this.subject1.next(10);
  //   this.subject1.next(20);
  //   this.subject1.next(30);
  // }
}
