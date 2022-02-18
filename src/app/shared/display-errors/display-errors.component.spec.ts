import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayErrorsComponent } from './display-errors.component';

describe('DisplayErrorsComponent', () => {
  let component: DisplayErrorsComponent;
  let fixture: ComponentFixture<DisplayErrorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayErrorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
