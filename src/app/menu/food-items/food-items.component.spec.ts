import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodItemsComponent } from './food-items.component';

describe('FoodItemsComponent', () => {
  let component: FoodItemsComponent;
  let fixture: ComponentFixture<FoodItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
