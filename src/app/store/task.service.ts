import { Injectable } from '@angular/core';
import { Task } from '../task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  async getTasks(): Promise<Task[]> {
    return new Promise((resolve) => {
      let tasks = localStorage.getItem('tasks');
      resolve(tasks ? JSON.parse(tasks) : []);
    });
  }

  async saveTasks(tasks: Task[]) {
    return localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}
