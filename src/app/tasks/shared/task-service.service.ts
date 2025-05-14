import { HttpClient, httpResource } from '@angular/common/http';
import {
  computed,
  effect,
  inject,
  Injectable,
  Injector,
  linkedSignal,
  ResourceStatus,
  signal,
  Signal,
} from '@angular/core';
import { Task, TaskResponse } from './task';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskServiceService {
  private baseUrl = 'http://localhost:2000';
  private http = inject(HttpClient);
  private injector = inject(Injector);

  taskToUpdate = signal<Task | undefined>(undefined);
  taskIdToDelete = signal<number | undefined>(undefined);
  isEditMode = signal<boolean>(false);

  tasksResource = httpResource<Task[]>({
    url: `${this.baseUrl}/api/tasks`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  tasks = computed(() => this.tasksResource.value());

  addTask(task: Task): Signal<TaskResponse | undefined> {
    console.log('TaskServiceService - addTask', task);
    return toSignal(
      this.http
        .post<TaskResponse>(`${this.baseUrl}/api/tasks`, task, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .pipe(
          map((response: TaskResponse) => {
            this.tasksResource.update((tasks) => {
              if (tasks) {
                tasks.push(response.response);
              }
              return tasks;
            });
            return response;
          })
        ),
      {
        injector: this.injector,
      }
    );
  }

  updateTask(task: Task): Signal<TaskResponse | undefined> {
    console.log('TaskServiceService - updateTask', task);
    return toSignal(
      this.http
        .put<TaskResponse>(`${this.baseUrl}/api/tasks/${task.id}`, task, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .pipe(
          map((response: TaskResponse) => {
            this.tasksResource.update((tasks) => {
              if (tasks) {
                const index = tasks.findIndex((t) => t.id === task.id);
                if (index !== -1) {
                  console.log('Task found in updateTask', tasks[index]);
                  console.log('Response in updateTask', response.response);
                  tasks[index] = task;
                }
              }
              return tasks;
            });
            return response;
          })
        ),
      {
        // injector: this.injector,
        // 
        // manualCleanup: true
      }
    );
  }

  deleteTask(taskId: Signal<number>) {
    // STANDARD GET
    // return httpResource(
    //   () => (taskId() ? `${this.baseUrl}/api/tasks/${taskId()}` : undefined),
    //   { injector: this.injector }
    // );
    // DONT USE RESOURCE API TO MUTATE DATA
    // THIS IS ONLY FOR DEMO PURPOSE

    const deleteRes = httpResource(
      {
        url: `${this.baseUrl}/api/tasks/${taskId()}`,
        method: 'DELETE',
      },
      {
        injector: this.injector,
      }
    );

    effect(
      () => {
        console.warn('Delete task effect', deleteRes.status());
        if (deleteRes.status() === ResourceStatus.Resolved) {
          this.tasksResource.update((tasks) => {
            if (tasks) {
              const index = tasks.findIndex((t) => t.id === taskId());
              if (index !== -1) {
                tasks.splice(index, 1);
              }
            }
            return tasks;
          });
        }
      },
      { injector: this.injector }
    );

    return deleteRes;
  }
}
