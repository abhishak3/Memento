import { on, createReducer, State, Action } from '@ngrx/store';

import { addTask, removeTask } from './task.actions';
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
  }))
);

export function taskReducer(state: TaskState | undefined, action: Action) {
  return reducer(state, action);
}
