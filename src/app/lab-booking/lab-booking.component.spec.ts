import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabBookingComponent } from './lab-booking.component';

describe('LabBookingComponent', () => {
  let component: LabBookingComponent;
  let fixture: ComponentFixture<LabBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabBookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
