import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnStepperComponent } from './learn-stepper.component';

describe('LearnStepperComponent', () => {
  let component: LearnStepperComponent;
  let fixture: ComponentFixture<LearnStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LearnStepperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LearnStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
