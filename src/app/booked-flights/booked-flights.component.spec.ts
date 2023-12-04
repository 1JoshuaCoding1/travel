import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedFlightsComponent } from './booked-flights.component';

describe('BookedFlightsComponent', () => {
  let component: BookedFlightsComponent;
  let fixture: ComponentFixture<BookedFlightsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookedFlightsComponent]
    });
    fixture = TestBed.createComponent(BookedFlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
