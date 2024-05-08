import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnExpansionPanelComponent } from './learn-expansion-panel.component';

describe('LearnExpansionPanelComponent', () => {
  let component: LearnExpansionPanelComponent;
  let fixture: ComponentFixture<LearnExpansionPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LearnExpansionPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LearnExpansionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
