import { createAction, props } from '@ngrx/store';

import { Task } from '../task';

export const addTask = createAction('[Task Page] Add Task', props<Task>());
export const removeTask = createAction(
  '[Task Page] Remove Task',
  props<{ id: string }>()
);
export const updateTask = createAction(
  '[Task Page] Update Task',
  props<{ id: string; task: Task }>()
);
export const sortTasks = createAction(
  '[Task Page] Sort Tasks',
  props<{ by: keyof Task }>()
);
export const loadTasks = createAction('[Task Page] Load Tasks');
export const loadTasksSuccess = createAction(
  '[Task Page] Load Tasks Success',
  props<{ tasks: Task[] }>()
);
export const loadTasksFailed = createAction(
  '[Task Page] Load Tasks Failed',
  props<{ error: string }>()
);
