import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http = inject(HttpClient);

  /**
   * Signal to hold the list of users.
   * using toSignal to convert the observable from HttpClient into a signal.
   * The initial value is set to an empty array.
   */
  public users = toSignal(
    this.http.get<User[]>(`https://jsonplaceholder.typicode.com/users`),
    { initialValue: [] }
  );
}
