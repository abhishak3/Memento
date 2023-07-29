import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskToolbarComponent } from './task-toolbar.component';

describe('TaskToolbarComponent', () => {
  let component: TaskToolbarComponent;
  let fixture: ComponentFixture<TaskToolbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskToolbarComponent]
    });
    fixture = TestBed.createComponent(TaskToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
