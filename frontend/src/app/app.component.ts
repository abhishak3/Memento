import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { selectStatus } from './store/task.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Memento';
  date = new Date();
  status$ = this.store.select(selectStatus);
  constructor(private store: Store<AppState>) {}
}
