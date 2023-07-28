import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { TaskService } from './task.service';
import {
  addTask,
  loadTasks,
  loadTasksFailed,
  loadTasksSuccess,
  removeTask,
  updateTask,
} from './task.actions';
import { catchError, from, map, of, switchMap, withLatestFrom } from 'rxjs';
import { selectAllTasks } from './task.selector';

@Injectable()
export class TaskEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private taskService: TaskService
  ) {}

  loadTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTasks),
      switchMap(() =>
        from(this.taskService.getTasks()).pipe(
          map((tasks) => loadTasksSuccess({ tasks: tasks })),
          catchError((error) => of(loadTasksFailed({ error: error })))
        )
      )
    )
  );

  saveTasks$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addTask, removeTask, updateTask),
        withLatestFrom(this.store.select(selectAllTasks)),
        switchMap(([action, tasks]) => this.taskService.saveTasks(tasks))
      ),
    { dispatch: false }
  );
}
