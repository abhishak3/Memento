import { on, createReducer, Action } from '@ngrx/store';

import {
  addTask,
  removeTask,
  loadTasks,
  loadTasksFailed,
  loadTasksSuccess,
  updateTask,
  sortTasks,
} from './task.actions';
import { Task } from '../task';

export interface TaskState {
  tasks: Task[];
  error: string | null;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: TaskState = {
  tasks: [],
  error: null,
  status: 'pending',
};

const reducer = createReducer(
  initialState,

  on(addTask, (state, action) => ({
    ...state,
    tasks: [...state.tasks, action],
  })),

  on(removeTask, (state, { id }) => ({
    ...state,
    tasks: state.tasks.filter((item) => item.id !== id),
  })),

  on(updateTask, (state, { id, task }) => ({
    ...state,
    tasks: state.tasks.map((item) =>
      item.id === id ? { ...task, id: id } : item
    ),
  })),

  on(sortTasks, (state, { by }) => {
    let tasks: Task[];
    let sortMap: Record<string, number> = {};
    if (by === 'priority') {
      sortMap = { low: 0, medium: -1, high: -2 };
    } else if (by === 'status') {
      sortMap = { todo: 0, 'in-progress': 1, completed: 2 };
    }

    if (Object.keys(sortMap).length == 0) {
      tasks = [...state.tasks].sort((a, b) => {
        if (a[by] <= b[by]) return -1;
        else return 1;
      });
    } else {
      tasks = [...state.tasks].sort((a, b) => {
        if (sortMap[a[by] as string] <= sortMap[b[by] as string]) return -1;
        else return 1;
      });
    }
    return { ...state, tasks: tasks };
  }),

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
