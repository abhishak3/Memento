import { createAction, props } from '@ngrx/store';

export const exportTasks = createAction('[Export Page] Export Tasks');
export const exportTasksSuccess = createAction(
  '[Export Page] Export Tasks Success'
);
export const exportTasksFailed = createAction(
  '[Export Page] Export Tasks Failed',
  props<{ error: string }>()
);
