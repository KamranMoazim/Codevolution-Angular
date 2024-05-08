import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnProgressSpinnerComponent } from './learn-progress-spinner.component';

describe('LearnProgressSpinnerComponent', () => {
  let component: LearnProgressSpinnerComponent;
  let fixture: ComponentFixture<LearnProgressSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LearnProgressSpinnerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LearnProgressSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
