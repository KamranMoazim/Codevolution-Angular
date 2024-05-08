import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnButtonComponent } from './learn-button.component';

describe('LearnButtonComponent', () => {
  let component: LearnButtonComponent;
  let fixture: ComponentFixture<LearnButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LearnButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LearnButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
