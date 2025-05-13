import { DatePipe, NgClass } from '@angular/common';
import {
  Component,
  computed,
  effect,
  inject,
  input,
  linkedSignal,
  OnInit,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TaskServiceService } from '../shared/task-service.service';
import { Task } from '../shared/task';

@Component({
  selector: 'app-add-task',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
})
export class AddTaskComponent implements OnInit {
  taskToUpdate = input<Task>({} as Task);

  taskForm!: FormGroup;
  fb = inject(FormBuilder);
  taskService = inject(TaskServiceService);
  datePipe: DatePipe = new DatePipe('en-US');
  // isEditMode = false;
  isSubmitted = false;

  isEditMode = computed(() => {
    const taskToUpdate = this.taskToUpdate();
    console.log('Task to update computed: ', taskToUpdate);

    if (taskToUpdate) {
      this.taskForm.patchValue({
        id: taskToUpdate.id,
        title: taskToUpdate.title,
        dueDate: taskToUpdate.dueDate,
        done: taskToUpdate.done,
      });
      return true;
    } else {
      return false;
    }
  });

  eff = effect(() => {
    const taskToUpdate = this.taskService.taskToUpdate();
    console.log('Task to update effect: ', taskToUpdate);
    if (taskToUpdate) {
      console.log('Task to update IF: ', taskToUpdate);
      this.taskService.isEditMode.set(true);
      this.taskForm.patchValue({
        id: taskToUpdate.id,
        title: taskToUpdate.title,
        dueDate: taskToUpdate.dueDate,
        done: taskToUpdate.done,
      });
    }
  });

  ngOnInit(): void {
    this.taskForm = this.fb.nonNullable.group({
      id: [''],
      title: ['', Validators.required],
      dueDate: [this.getActualDate()],
      done: [false],
    });
  }

  public getActualDate(): string {
    const today = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    return today ?? '';
  }

  public get controls() {
    return this.taskForm.controls;
  }

  public submitTaskForm(): void {
    console.log('Form Submitted', this.taskForm.value);

    if (this.taskForm.invalid) {
      return;
    }
    // if (this.taskService.isEditMode()) {
    if (this.isEditMode()) {
      this.taskService.isEditMode.set(false);
      this.taskService.taskToUpdate.set(undefined);
      this.taskService.updateTask(this.taskForm.value);
    } else {
      this.taskService.addTask(this.taskForm.value);
      this.taskForm.reset();
    }
  }
}
