import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnAutocompleteComponent } from './learn-autocomplete.component';

describe('LearnAutocompleteComponent', () => {
  let component: LearnAutocompleteComponent;
  let fixture: ComponentFixture<LearnAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LearnAutocompleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LearnAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
