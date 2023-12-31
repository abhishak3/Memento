import { Injectable } from '@angular/core';
import { Priority, Status, Task } from '../task';
import { Papa } from 'ngx-papaparse';
import { Log } from '../log';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, map } from 'rxjs';

export interface TaskResponse {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  status: string;
  historyLog: Log[];
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  baseUrl: string = 'https://memento-backend-abhishak3.vercel.app';
  constructor(private papa: Papa, private http: HttpClient) {}
  async getTasks() {
    var tasks: Task[] = await lastValueFrom(
      this.http.get<TaskResponse[]>(`${this.baseUrl}/tasks/`).pipe(
        map((taskResponses) =>
          taskResponses.map((taskResponse) => ({
            ...taskResponse,
            dueDate: new Date(taskResponse.dueDate + 'Z'),
            priority: taskResponse.priority as Priority,
            status: taskResponse.status as Status,
          }))
        )
      )
    );
    return tasks;
    /* for Local Storage */
    // let tasks = localStorage.getItem('tasks');
    // return (await JSON.parse(tasks ?? '')) || [];
  }

  async createTask(task: Task) {
    return await lastValueFrom(
      this.http.post<Task>(`${this.baseUrl}/tasks/`, task)
    );
  }

  async updateTask(task: Task) {
    return await lastValueFrom(
      this.http.post<Task>(`${this.baseUrl}/task/${task.id}`, task)
    );
  }

  async removeTask(task_id: string) {
    return await lastValueFrom(
      this.http.delete<null>(`${this.baseUrl}/task/${task_id}`)
    );
  }

  /* for Local Storage */
  // async saveTasks(tasks: Task[]) {
  //   return localStorage.setItem('tasks', JSON.stringify(tasks));
  // }

  async exportToCSV() {
    // const data = localStorage.getItem('tasks');
    const data = await lastValueFrom(
      this.http.get<any>(`${this.baseUrl}/tasks/`)
    );
    const csvData = this.papa.unparse(data, {
      columns: ['id', 'title', 'description', 'dueDate', 'priority', 'status'],
    });
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'export.csv';
    link.click();
  }

  static getLog(new_task: Task, old_task: Task | null = null): Log[] {
    const newlogs: Log[] = [];
    const now = new Date();
    if (!old_task) {
      newlogs.push({
        timestamp: now,
        action: `::TASK CREATED:: ID (${new_task.id})`,
      });
      for (const key in new_task) {
        if (['id', 'historyLog', 'type'].includes(key)) continue;
        newlogs.push({
          timestamp: now,
          action: `::TASK INITIALIZED::${key.toUpperCase()} set to ${
            new_task[key as keyof Task]
          }`,
        });
      }
    } else {
      for (const key in old_task) {
        if (old_task[key as keyof Task] !== new_task[key as keyof Task]) {
          if (['id', 'historyLog', 'type'].includes(key)) continue;
          newlogs.push({
            timestamp: now,
            action: `::TASK UPDATED::${key.toUpperCase()} changed to ${
              new_task[key as keyof Task]
            }`,
          });
        }
      }
    }
    return newlogs;
  }
}
