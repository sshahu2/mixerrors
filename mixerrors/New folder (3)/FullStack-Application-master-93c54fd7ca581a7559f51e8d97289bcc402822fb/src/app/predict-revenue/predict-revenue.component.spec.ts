import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictRevenueComponent } from './predict-revenue.component';

describe('PredictRevenueComponent', () => {
  let component: PredictRevenueComponent;
  let fixture: ComponentFixture<PredictRevenueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PredictRevenueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PredictRevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
