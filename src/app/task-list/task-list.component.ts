import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../app.state';
import { selectAllTasks } from '../store/task.selector';
import { loadTasks, removeTask, updateTask } from '../store/task.actions';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskDialogComponent } from '../edit-task-dialog/edit-task-dialog.component';
import { Status, Task } from '../task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  allTasks$ = this.store.pipe(select(selectAllTasks));

  constructor(private store: Store<AppState>, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.store.dispatch(loadTasks());
  }

  removeTask(id: string) {
    this.store.dispatch(removeTask({ id }));
  }

  updateStatus(task: Task, status: Status) {
    this.store.dispatch(
      updateTask({ id: task.id, task: { ...task, status: status } })
    );
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    task: Task
  ): void {
    this.dialog.open(EditTaskDialogComponent, {
      width: '500px',
      data: task,
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
