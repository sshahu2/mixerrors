import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerBarChartComponent } from './ver-bar-chart.component';

describe('VerBarChartComponent', () => {
  let component: VerBarChartComponent;
  let fixture: ComponentFixture<VerBarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerBarChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
