import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodDetailsComponent } from './food-details.component';

describe('FoodDetailsComponent', () => {
  let component: FoodDetailsComponent;
  let fixture: ComponentFixture<FoodDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
