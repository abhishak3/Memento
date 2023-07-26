import { Component } from '@angular/core';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent {

  panelOpenState: boolean = false;

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
