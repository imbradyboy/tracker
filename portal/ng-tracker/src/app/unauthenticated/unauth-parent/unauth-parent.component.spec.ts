import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthParentComponent } from './unauth-parent.component';

describe('UnauthParentComponent', () => {
  let component: UnauthParentComponent;
  let fixture: ComponentFixture<UnauthParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnauthParentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnauthParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
