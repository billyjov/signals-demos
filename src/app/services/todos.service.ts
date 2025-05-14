import { HttpClient, httpResource } from '@angular/common/http';
import {
  inject,
  Injectable,
  signal,
  effect,
  linkedSignal,
  resource,
} from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { EMPTY, Observable } from 'rxjs';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private http = inject(HttpClient);

  todos = signal<Todo[]>([]);
  selectedUserId = signal<number | undefined>(undefined);

  // Method 1- effect
  // myEffect = effect(() => {
  //   const userId = this.selectedUserId();
  //   if (userId) {
  //     this.getTodos(userId).subscribe((todos) => {
  //       this.todos.set(todos);
  //     });
  //   }
  // });

  // Method 2- rxResource

  // todosResource = resource({
  //   request: () => ({
  //     userId: this.selectedUserId(),
  //   }),
  //   loader: ({ request, abortSignal }) => {
  //     const userId = request.userId;
  //     if (userId) {
  //       return fetch(
  //         `https://jsonplaceholder.typicode.com/users/${userId}/todos`, {
  //           // signal: abortSignal,
  //         }
  //       );
  //     }
  //     return Promise.resolve(new Response());
  //   },
  // });

  // Method 3- rxResource
  // todosResource = rxResource({
  //   request: () => ({
  //     userId: this.selectedUserId(),
  //   }),
  //   loader: ({ request }) => {
  //     const userId = request.userId;
  //     if (userId) {
  //       return this.http.get<Todo[]>(
  //         `https://jsonplaceholder.typicode.com/users/${userId}/todos`
  //       );
  //     }
  //     return EMPTY;
  //   },
  // });

  // Method 3- httpResource

  // todosResource = httpResource<Todo[]>(
  //   () => `https://jsonplaceholder.typicode.com/users/${this.selectedUserId()}/todos`
  // );

  setUserId(userId: number) {
    this.todos.set([]);
    this.selectedUserId.set(userId);
  }

  getTodos(userId: number | undefined): Observable<Todo[]> {
    return this.http.get<Todo[]>(
      `https://jsonplaceholder.typicode.com/users/${userId}/todos`
    );
  }
}
