import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnTabsComponent } from './learn-tabs.component';

describe('LearnTabsComponent', () => {
  let component: LearnTabsComponent;
  let fixture: ComponentFixture<LearnTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LearnTabsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LearnTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
