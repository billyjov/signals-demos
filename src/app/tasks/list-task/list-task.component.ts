import { AsyncPipe, DatePipe, NgClass } from '@angular/common';
import { Component, computed, inject, output, signal } from '@angular/core';
import { TaskServiceService } from '../shared/task-service.service';
import { Task } from '../shared/task';

@Component({
  selector: 'app-list-task',
  imports: [NgClass, DatePipe, AsyncPipe],
  templateUrl: './list-task.component.html',
  styleUrl: './list-task.component.css',
})
export class ListTaskComponent {
  readonly taskService = inject(TaskServiceService);

  taskToUpdate = output<Task>();

  tasks = computed(() => this.taskService.tasksResource.value());

  editTask(task: Task): void {
    const datePipe: DatePipe = new DatePipe('en-US');
    const formattedDate = datePipe.transform(task.dueDate, 'yyyy-MM-dd');
    task.dueDate = formattedDate ?? '';
    // Logic to edit a task
    console.log('Edit task: ', task);
    // this.taskService.taskToUpdate.set(task);
    this.taskToUpdate.emit(task);
  }

  removeTask(task: any): void {
    // Logic to delete a task
    console.log('Delete task');
    const deleteResource = this.taskService.deleteTask(signal(task.id));
    computed(() => deleteResource.status());
  }

  markAsDone(isChecked: any, task: any): void {
    // Logic to mark a task as done
    console.log('Mark task as done');
  }
}
