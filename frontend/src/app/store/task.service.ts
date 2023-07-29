import { Injectable } from '@angular/core';
import { Task } from '../task';
import { Papa } from 'ngx-papaparse';
import { Log } from '../log';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private papa: Papa) {}
  async getTasks() {
    let tasks = localStorage.getItem('tasks');
    return (await JSON.parse(tasks ?? '')) || [];
  }

  async saveTasks(tasks: Task[]) {
    return localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  async exportToCSV() {
    const data = localStorage.getItem('tasks');
    const csvData = this.papa.unparse(JSON.parse(data ?? ''), {
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