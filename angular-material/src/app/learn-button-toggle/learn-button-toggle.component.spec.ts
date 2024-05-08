import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnButtonToggleComponent } from './learn-button-toggle.component';

describe('LearnButtonToggleComponent', () => {
  let component: LearnButtonToggleComponent;
  let fixture: ComponentFixture<LearnButtonToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LearnButtonToggleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LearnButtonToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
