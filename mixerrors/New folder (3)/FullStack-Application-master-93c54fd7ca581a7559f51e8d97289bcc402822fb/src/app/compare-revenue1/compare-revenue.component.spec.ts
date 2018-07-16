import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareRevenueComponent } from './compare-revenue.component';

describe('CompareRevenueComponent', () => {
  let component: CompareRevenueComponent;
  let fixture: ComponentFixture<CompareRevenueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompareRevenueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareRevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
