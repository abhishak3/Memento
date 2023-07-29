import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../app.state';
import { selectAllTasks } from '../store/task.selector';
import { loadTasks, removeTask, updateTask } from '../store/task.actions';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskDialogComponent } from '../edit-task-dialog/edit-task-dialog.component';
import { Status, Task } from '../task';
import { TaskLogDialogComponent } from '../task-log-dialog/task-log-dialog.component';
import { TaskService } from '../store/task.service';

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
    const new_task = { ...task, status: status };
    new_task.historyLog = [
      ...new_task.historyLog,
      ...TaskService.getLog(new_task, task),
    ];
    this.store.dispatch(updateTask({ id: task.id, task: new_task }));
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    task: Task,
    type: string
  ): void {
    switch (type) {
      case 'edit':
        this.dialog.open(EditTaskDialogComponent, {
          width: '500px',
          data: task,
          enterAnimationDuration,
          exitAnimationDuration,
        });
        break;
      case 'log':
        this.dialog.open(TaskLogDialogComponent, {
          data: task.historyLog,
        });
        break;
      default:
        console.log('UNKNOWN DIALOUGE TYPE');
        break;
    }
  }
}
