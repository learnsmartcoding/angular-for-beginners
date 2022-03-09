import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodCreateComponent } from './food-create.component';

describe('FoodCreateComponent', () => {
  let component: FoodCreateComponent;
  let fixture: ComponentFixture<FoodCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
