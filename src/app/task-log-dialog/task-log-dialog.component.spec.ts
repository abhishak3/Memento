import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskLogDialogComponent } from './task-log-dialog.component';

describe('TaskLogDialogComponent', () => {
  let component: TaskLogDialogComponent;
  let fixture: ComponentFixture<TaskLogDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskLogDialogComponent]
    });
    fixture = TestBed.createComponent(TaskLogDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
