import { Component } from '@angular/core';
import { ListTaskComponent } from './list-task/list-task.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { Task } from './shared/task';

@Component({
  selector: 'app-tasks',
  imports: [ListTaskComponent, AddTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  selectedTask!: Task;

  taskSelected(task: Task): void {
    this.selectedTask = task;
    console.log('Selected task: ', task);
  }
}
