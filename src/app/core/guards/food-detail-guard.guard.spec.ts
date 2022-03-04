import { TestBed } from '@angular/core/testing';

import { FoodDetailGuardGuard } from './food-detail-guard.guard';

describe('FoodDetailGuardGuard', () => {
  let guard: FoodDetailGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FoodDetailGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
