import { HttpClient, httpResource } from '@angular/common/http';
import {
  Component,
  computed,
  inject,
  linkedSignal,
  resource,
  signal,
} from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule } from '@angular/forms';
import { User } from '../models/user';
import { UsersService } from '../services/users.service';
import { TodosService } from '../services/todos.service';

@Component({
  selector: 'app-linked',
  imports: [FormsModule],
  templateUrl: './linked.component.html',
  styleUrl: './linked.component.css',
})
export class LinkedComponent {
  usersService = inject(UsersService);
  todosService = inject(TodosService);

  users = this.usersService.users;
  // Method 1
  todos = this.todosService.todos;
  // todos = computed(() => this.todosService.todosResource.value() ?? []);
  selectedUserId = this.todosService.selectedUserId;
  isLoading = signal(false);

  http = inject(HttpClient);
  // selectedUserId = signal(0);
  // selectedTodoId = signal(0);

  usersS = linkedSignal(
    toSignal(this.http.get('https://jsonplaceholder.typicode.com/users'))
  );

  

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

  selectUser(userEventId: EventTarget | null) {
    const userId = +(userEventId as HTMLSelectElement).value;
    this.todosService.setUserId(userId);
  }
}
