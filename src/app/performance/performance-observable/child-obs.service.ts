import { Injectable, Injector, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChildObsService {
  /**
   * Be careful with toSignal.
   */
  counter = toSignal(
    interval(1000).pipe(
      tap((value) => console.log('ChildObsService interval', value))
    )
  );


  // Alternative with injector
  // Provide initial value or not depending on the use case
  // getCounter(injector: Injector): Signal<number> {
  //   return toSignal(
  //     interval(1000).pipe(
  //       tap((value) => console.log('ChildObsService interval', value))
  //     ),
  //     { injector }
  //   );
  // }
}
