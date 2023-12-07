import { Component } from '@angular/core';
import { Firestore, collection, getDocs, deleteDoc, doc } from '@angular/fire/firestore';

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
      const flightData = { id: doc.id, ...doc.data() };
      console.log('Flight Data:', flightData);
      this.flights.push(flightData);
    });
  }

  async deleteFlight(flightId: string) {
    const flightDoc = doc(this.fs, 'flights', flightId);

    try {
      await deleteDoc(flightDoc);
      console.log('Flight deleted successfully');
      this.getFlights(); // Refresh the flights data after deletion
    } catch (error) {
      console.error('Flight deletion error:', error);
    }
  }

}
