import { Log } from './log';

export type Priority = 'low' | 'medium' | 'high';
export type Status = 'todo' | 'in-progress' | 'completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  priority: Priority;
  status: Status;
  historyLog: Log[];
}
