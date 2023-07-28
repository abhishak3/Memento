import { Action, on, createReducer } from '@ngrx/store';
import {
  exportTasks,
  exportTasksFailed,
  exportTasksSuccess,
} from './export.actions';

export interface ExportState {
  error: string | null;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialExportState: ExportState = {
  error: null,
  status: 'pending',
};

const reducer = createReducer(
  initialExportState,
  on(exportTasks, (state) => ({ ...state, status: 'loading' as const })),
  on(exportTasksSuccess, (state) => ({ ...state, status: 'success' as const })),
  on(exportTasksFailed, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error: error,
  }))
);

export function exportReducer(state: ExportState | undefined, action: Action) {
  return reducer(state, action);
}
