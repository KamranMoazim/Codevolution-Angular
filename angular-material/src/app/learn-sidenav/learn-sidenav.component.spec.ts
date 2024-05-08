import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnSidenavComponent } from './learn-sidenav.component';

describe('LearnSidenavComponent', () => {
  let component: LearnSidenavComponent;
  let fixture: ComponentFixture<LearnSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LearnSidenavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LearnSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
