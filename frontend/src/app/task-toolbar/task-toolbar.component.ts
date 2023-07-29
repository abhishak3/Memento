import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { Task } from '../task';
import { selectAllTasks } from '../store/task.selector';
import { sortTasks } from '../store/task.actions';
import { exportTasks } from '../store/export.actions';

@Component({
  selector: 'app-task-toolbar',
  templateUrl: './task-toolbar.component.html',
  styleUrls: ['./task-toolbar.component.css'],
})
export class TaskToolbarComponent {
  title: string = 'Memento';
  tasks = this.store.select(selectAllTasks);
  constructor(private store: Store<AppState>) {}
  sortBy(by: keyof Task) {
    this.store.dispatch(sortTasks({ by: by }));
  }
  export() {
    this.store.dispatch(exportTasks());
  }
}
