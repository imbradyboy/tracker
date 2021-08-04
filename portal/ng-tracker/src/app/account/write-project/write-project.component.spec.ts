import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteProjectComponent } from './write-project.component';

describe('WriteProjectComponent', () => {
  let component: WriteProjectComponent;
  let fixture: ComponentFixture<WriteProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WriteProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WriteProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
