import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceObservableComponent } from './performance-observable.component';

describe('PerformanceObservableComponent', () => {
  let component: PerformanceObservableComponent;
  let fixture: ComponentFixture<PerformanceObservableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerformanceObservableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerformanceObservableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
