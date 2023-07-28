import { ExportState } from './store/export.reducer';
import { TaskState } from './store/task.reducer';

export interface AppState {
  task: TaskState;
  export: ExportState;
}
