import { TestBed } from '@angular/core/testing';

import { FoodDetailsGuard } from './food-details.guard';

describe('FoodDetailsGuard', () => {
  let guard: FoodDetailsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FoodDetailsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
