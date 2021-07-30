import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteProjectDialogComponent } from './write-project-dialog.component';

describe('WriteProjectWriteProjectDialogComponent', () => {
  let component: WriteProjectDialogComponent;
  let fixture: ComponentFixture<WriteProjectDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WriteProjectDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WriteProjectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
