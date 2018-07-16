import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricPredictionComponent } from './historic-prediction.component';

describe('HistoricPredictionComponent', () => {
  let component: HistoricPredictionComponent;
  let fixture: ComponentFixture<HistoricPredictionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricPredictionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricPredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
