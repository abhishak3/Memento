import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Priority, Status, Task } from '../task';
import { AppState } from '../app.state';
import { updateTask } from '../store/task.actions';
import { TaskService } from '../store/task.service';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css'],
})
export class EditTaskDialogComponent {
  taskForm = new FormGroup({
    title: new FormControl(this.data.title, [Validators.required]),
    description: new FormControl(this.data.description),
    dueDate: new FormControl(this.data.dueDate, [Validators.required]),
    priority: new FormControl(this.data.priority, [Validators.required]),
    status: new FormControl(this.data.status, [Validators.required]),
  });

  constructor(
    private store: Store<AppState>,
    public dialogRef: MatDialogRef<EditTaskDialogComponent>,
    private taskService: TaskService,
    @Inject(MAT_DIALOG_DATA) public data: Task
  ) {}

  onSubmit() {
    if (this.taskForm.valid) {
      const formData = this.taskForm.value;
      const new_task: Task = {
        id: this.data.id,
        title: formData.title as string,
        description: formData.description as string,
        dueDate: formData.dueDate as Date,
        priority: formData.priority as Priority,
        status: formData.status as Status,
        historyLog: this.data.historyLog,
      };
      new_task.historyLog = [
        ...new_task.historyLog,
        ...TaskService.getLog(new_task, this.data),
      ];
      this.store.dispatch(updateTask({ id: this.data.id, task: new_task }));
      this.taskForm.reset();
    } else {
      console.log('Not Valid Submission!');
    }
  }

  // date filter
  currentFilter = (d: Date | null): boolean => {
    if (!d) {
      return false;
    }
    const current = new Date();
    current.setHours(0, 0, 0, 0);
    return current <= d;
  };
}
