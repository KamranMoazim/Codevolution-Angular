import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnBadgesComponent } from './learn-badges.component';

describe('LearnBadgesComponent', () => {
  let component: LearnBadgesComponent;
  let fixture: ComponentFixture<LearnBadgesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LearnBadgesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LearnBadgesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
