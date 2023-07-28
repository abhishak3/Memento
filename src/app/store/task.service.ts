import { Injectable } from '@angular/core';
import { Task } from '../task';
import { Papa } from 'ngx-papaparse';

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
    const csvData = this.papa.unparse(JSON.parse(data ?? ''));
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'export.csv';
    link.click();
  }
}
