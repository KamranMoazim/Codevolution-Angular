import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnCheckboxRadioButtonComponent } from './learn-checkbox-radio-button.component';

describe('LearnCheckboxRadioButtonComponent', () => {
  let component: LearnCheckboxRadioButtonComponent;
  let fixture: ComponentFixture<LearnCheckboxRadioButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LearnCheckboxRadioButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LearnCheckboxRadioButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
