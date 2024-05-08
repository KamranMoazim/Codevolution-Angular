import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnTypographyComponent } from './learn-typography.component';

describe('LearnTypographyComponent', () => {
  let component: LearnTypographyComponent;
  let fixture: ComponentFixture<LearnTypographyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LearnTypographyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LearnTypographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
