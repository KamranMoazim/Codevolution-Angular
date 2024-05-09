import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnVirtualScrollingComponent } from './learn-virtual-scrolling.component';

describe('LearnVirtualScrollingComponent', () => {
  let component: LearnVirtualScrollingComponent;
  let fixture: ComponentFixture<LearnVirtualScrollingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LearnVirtualScrollingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LearnVirtualScrollingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
