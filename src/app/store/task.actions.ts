import { createAction, props } from '@ngrx/store';

import { Task } from '../task';

export const addTask = createAction('[Task Page] Add Task', props<Task>());
export const removeTask = createAction(
  '[Task Page] Remove Task',
  props<{ id: number }>()
);
