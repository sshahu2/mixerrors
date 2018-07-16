import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizationDialogComponent } from './customization-dialog.component';

describe('CustomizationDialogComponent', () => {
  let component: CustomizationDialogComponent;
  let fixture: ComponentFixture<CustomizationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomizationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomizationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
