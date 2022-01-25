import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BindingExamplesComponent } from './binding-examples.component';

describe('BindingExamplesComponent', () => {
  let component: BindingExamplesComponent;
  let fixture: ComponentFixture<BindingExamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BindingExamplesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BindingExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
