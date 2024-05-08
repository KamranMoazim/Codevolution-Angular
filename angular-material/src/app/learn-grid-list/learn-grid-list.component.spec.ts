import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnGridListComponent } from './learn-grid-list.component';

describe('LearnGridListComponent', () => {
  let component: LearnGridListComponent;
  let fixture: ComponentFixture<LearnGridListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LearnGridListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LearnGridListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
