import { Component } from '@angular/core';
import { Firestore, collection, addDoc,getDocs  } from '@angular/fire/firestore';

@Component({
  selector: 'app-add-flights',
  templateUrl: './add-flights.component.html',
  styleUrls: ['./add-flights.component.css']
})
export class AddFlightsComponent {
  
  constructor(private fs: Firestore) {}

  async addFlights(destination: string, departure: string, price: string) {
    const flightData = {
      destination,
      departure,
      price,
    };

    try {
      const flightsCollection = collection(this.fs, 'flights');
      await addDoc(flightsCollection, flightData);
      console.log('Flight added successfully');
    } catch (error) {
      console.error('Flight addition error:', error);
    }
  }

  onSubmit(destination: string, departure: string, price: string) {
    // Call your addFlights method when the form is submitted
    this.addFlights(destination, departure, price);
  }

// view flights

  flights: any[] = [];


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
