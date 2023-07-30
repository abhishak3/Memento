import { createSelector } from '@ngrx/store';

import { TaskState } from './task.reducer';
import { AppState } from '../app.state';

export const selectTasks = (state: AppState) => state.task;
export const selectAllTasks = createSelector(
  selectTasks,
  (state: TaskState) => state.tasks
);
export const selectStatus = createSelector(
  selectTasks,
  (state: TaskState) => state.status
);
