import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildObsComponent } from './child-obs.component';

describe('ChildObsComponent', () => {
  let component: ChildObsComponent;
  let fixture: ComponentFixture<ChildObsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChildObsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildObsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
