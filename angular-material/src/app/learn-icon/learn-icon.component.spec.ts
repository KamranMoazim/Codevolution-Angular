import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnIconComponent } from './learn-icon.component';

describe('LearnIconComponent', () => {
  let component: LearnIconComponent;
  let fixture: ComponentFixture<LearnIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LearnIconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LearnIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
