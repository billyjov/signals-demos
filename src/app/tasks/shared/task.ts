export interface Task {
  id: number;
  title: string;
  done: boolean;
  dueDate: Date | string;
  createdAt?: Date;
  updatedAt?: Date;
}


export interface TaskResponse {
    message: string;
    response: Task;
}
