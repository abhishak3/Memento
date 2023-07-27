import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../app.state';
import { selectAllTasks } from '../store/task.selector';
import { loadTasks, removeTask } from '../store/task.actions';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  allTasks$ = this.store.pipe(select(selectAllTasks));

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(loadTasks());
  }

  removeTask(id: string) {
    this.store.dispatch(removeTask({ id }));
  }
}
