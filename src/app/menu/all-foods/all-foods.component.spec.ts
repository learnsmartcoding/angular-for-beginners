import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllFoodsComponent } from './all-foods.component';

describe('AllFoodsComponent', () => {
  let component: AllFoodsComponent;
  let fixture: ComponentFixture<AllFoodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllFoodsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllFoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
