import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuisineDetailsComponent } from './cuisine-details.component';

describe('CuisineDetailsComponent', () => {
  let component: CuisineDetailsComponent;
  let fixture: ComponentFixture<CuisineDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuisineDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuisineDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
