import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnDatepickerComponent } from './learn-datepicker.component';

describe('LearnDatepickerComponent', () => {
  let component: LearnDatepickerComponent;
  let fixture: ComponentFixture<LearnDatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LearnDatepickerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LearnDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
