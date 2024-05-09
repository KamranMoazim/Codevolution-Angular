import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnSelectComponent } from './learn-select.component';

describe('LearnSelectComponent', () => {
  let component: LearnSelectComponent;
  let fixture: ComponentFixture<LearnSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LearnSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LearnSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
