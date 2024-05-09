import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnInputComponent } from './learn-input.component';

describe('LearnInputComponent', () => {
  let component: LearnInputComponent;
  let fixture: ComponentFixture<LearnInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LearnInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LearnInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
