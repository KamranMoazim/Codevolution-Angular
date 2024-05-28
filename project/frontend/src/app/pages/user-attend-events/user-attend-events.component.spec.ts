import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAttendEventsComponent } from './user-attend-events.component';

describe('UserAttendEventsComponent', () => {
  let component: UserAttendEventsComponent;
  let fixture: ComponentFixture<UserAttendEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserAttendEventsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserAttendEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
