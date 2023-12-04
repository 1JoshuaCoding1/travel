import { Component } from '@angular/core';

import { Firestore, collection, getDocs } from '@angular/fire/firestore';

@Component({
  selector: 'app-booked-flights',
  templateUrl: './booked-flights.component.html',
  styleUrls: ['./booked-flights.component.css']
})
export class BookedFlightsComponent {

  flights: any[] = [];

  constructor(private fs: Firestore) {}

  ngOnInit() {
    this.getFlights();
  }

  async getFlights() {
    const flightsCollection = collection(this.fs, 'flights');
    const querySnapshot = await getDocs(flightsCollection);
    
    this.flights = [];
    querySnapshot.forEach((doc) => {
      this.flights.push(doc.data());
    });
  }

}
