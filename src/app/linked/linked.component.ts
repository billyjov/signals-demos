import { HttpClient, httpResource } from '@angular/common/http';
import {
  Component,
  inject,
  linkedSignal,
  resource,
  signal,
} from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule } from '@angular/forms';
import { User } from '../models/user';

@Component({
  selector: 'app-linked',
  imports: [FormsModule],
  templateUrl: './linked.component.html',
  styleUrl: './linked.component.css',
})
export class LinkedComponent {
  http = inject(HttpClient);
  selectedUserId = signal(0);
  selectedTodoId = signal(0);

  // users = linkedSignal(
  //   toSignal(this.http.get('https://jsonplaceholder.typicode.com/users'))
  // );

  // users = resource({
  //   loader: () => fetch('https://jsonplaceholder.typicode.com/users'),
  // });

  // usersResource = rxResource({
  //   request: () => ({
  //     userId: this.selectedUserId,
  //     todoId: this.selectedTodoId,
  //   }),
  //   loader: ({ request }) =>
  //     this.http.get<User[]>(
  //       `https://jsonplaceholder.typicode.com/users/${request.userId}/todos/${request.todoId}`
  //     ),
  // });

  // usersHttpResource = httpResource<User[]>('https://jsonplaceholder.typicode.com/users')
  // usersHttpResource = httpResource<User[]>('https://jsonplaceholder.typicode.com/users', {
  //   defaultValue: [],
  //   parse: (response: any) => response.json(),
  // })



  // user100 = linkedSignal({
  //   source: signal(100),
  //   computation: (source) => {
  //     return this.http.get(
  //       `https://jsonplaceholder.typicode.com/todos?userId=${source}`
  //     );
  //   },
  // });

  control = new FormControl('Anna');

  // Signal ist automatisch mit dem FormControl verbunden
}
