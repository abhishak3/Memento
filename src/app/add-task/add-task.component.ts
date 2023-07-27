import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent {

  panelOpenState: boolean = false;

  taskForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    dueDate: new FormControl('', [Validators.required]),
    priority: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required])
  });
  
  onSubmit() {
    console.log(this.taskForm.value);
    this.taskForm.reset();
  }

  // date filter
  currentFilter = (d: Date | null): boolean => {
    if (!d) {
      return false;
    }
    const current = new Date();
    current.setHours(0,0,0,0);
    return current <= d;
  };
}
