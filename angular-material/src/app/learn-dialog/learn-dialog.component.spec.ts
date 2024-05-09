import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnDialogComponent } from './learn-dialog.component';

describe('LearnDialogComponent', () => {
  let component: LearnDialogComponent;
  let fixture: ComponentFixture<LearnDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LearnDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LearnDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
