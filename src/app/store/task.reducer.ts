import { on, createReducer, Action } from '@ngrx/store';

import {
  addTask,
  removeTask,
  loadTasks,
  loadTasksFailed,
  loadTasksSuccess,
} from './task.actions';
import { Task } from '../task';

export interface TaskState {
  tasks: Task[];
  index: number;
  error: string | null;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: TaskState = {
  tasks: [],
  index: 0,
  error: null,
  status: 'pending',
};

const reducer = createReducer(
  initialState,

  on(addTask, (state, action) => ({
    ...state,
    index: state.index + 1,
    tasks: [...state.tasks, action],
  })),

  on(removeTask, (state, { id }) => ({
    ...state,
    tasks: state.tasks.filter((item) => item.id !== id),
  })),

  on(loadTasks, (state) => ({
    ...state,
    status: 'loading' as const,
  })),

  on(loadTasksSuccess, (state, { tasks }) => ({
    ...state,
    tasks: tasks,
    error: null,
    status: 'success' as const,
  })),

  on(loadTasksFailed, (state, { error }) => ({
    ...state,
    error: error,
  }))
);

export function taskReducer(state: TaskState | undefined, action: Action) {
  return reducer(state, action);
}
