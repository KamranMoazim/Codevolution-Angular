import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnSnackbarComponent } from './learn-snackbar.component';

describe('LearnSnackbarComponent', () => {
  let component: LearnSnackbarComponent;
  let fixture: ComponentFixture<LearnSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LearnSnackbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LearnSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
