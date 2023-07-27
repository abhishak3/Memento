import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { addTask, removeTask } from '../store/task.actions';
import { Task, Priority, Status } from '../task';
import { selectAllTasks } from '../store/task.selector';
import { AppState } from '../app.state';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent {
  allTodos$ = this.store.pipe(select(selectAllTasks));
  panelOpenState: boolean = false;

  taskForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    dueDate: new FormControl('', [Validators.required]),
    priority: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
  });

  constructor(private store: Store<AppState>) {}

  onSubmit() {
    if (this.taskForm.valid) {
      const formData = this.taskForm.value;
      const new_task: Task = {
        id: Date.now().toString(),
        title: formData.title as string,
        description: formData.description as string,
        dueDate: new Date(formData.dueDate as string),
        priority: formData.priority as Priority,
        status: formData.status as Status,
      };
      console.log('NEW TASK:', new_task);
      this.store.dispatch(addTask(new_task));
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
