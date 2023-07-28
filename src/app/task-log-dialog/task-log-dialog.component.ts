import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Log } from '../log';

@Component({
  selector: 'app-task-log-dialog',
  templateUrl: './task-log-dialog.component.html',
  styleUrls: ['./task-log-dialog.component.css'],
})
export class TaskLogDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<TaskLogDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Log[]
  ) {}
}
