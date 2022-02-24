import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipeExamplesComponent } from './pipe-examples.component';

describe('PipeExamplesComponent', () => {
  let component: PipeExamplesComponent;
  let fixture: ComponentFixture<PipeExamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PipeExamplesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PipeExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
