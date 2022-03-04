import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuisineViewComponent } from './cuisine-view.component';

describe('CuisineViewComponent', () => {
  let component: CuisineViewComponent;
  let fixture: ComponentFixture<CuisineViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuisineViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuisineViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
