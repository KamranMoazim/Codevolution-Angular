import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreatedEventsComponent } from './admin-created-events.component';

describe('AdminCreatedEventsComponent', () => {
  let component: AdminCreatedEventsComponent;
  let fixture: ComponentFixture<AdminCreatedEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminCreatedEventsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminCreatedEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
