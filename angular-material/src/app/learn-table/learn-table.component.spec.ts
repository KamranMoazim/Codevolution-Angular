import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnTableComponent } from './learn-table.component';

describe('LearnTableComponent', () => {
  let component: LearnTableComponent;
  let fixture: ComponentFixture<LearnTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LearnTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LearnTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
