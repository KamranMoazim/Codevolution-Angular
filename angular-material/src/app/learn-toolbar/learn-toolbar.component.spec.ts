import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnToolbarComponent } from './learn-toolbar.component';

describe('LearnToolbarComponent', () => {
  let component: LearnToolbarComponent;
  let fixture: ComponentFixture<LearnToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LearnToolbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LearnToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
