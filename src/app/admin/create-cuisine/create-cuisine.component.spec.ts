import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCuisineComponent } from './create-cuisine.component';

describe('CreateCuisineComponent', () => {
  let component: CreateCuisineComponent;
  let fixture: ComponentFixture<CreateCuisineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCuisineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCuisineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
