import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnTooltipComponent } from './learn-tooltip.component';

describe('LearnTooltipComponent', () => {
  let component: LearnTooltipComponent;
  let fixture: ComponentFixture<LearnTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LearnTooltipComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LearnTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
