import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Firestore, collection, addDoc, getDocs, doc, deleteDoc } from '@angular/fire/firestore';


@Component({
  selector: 'app-add-flights',
  templateUrl: './add-flights.component.html',
  styleUrls: ['./add-flights.component.css']
})
export class AddFlightsComponent {
  destination: string = '';
  departure: string = '';
  price: string = '';

  constructor(private fs: Firestore) {}

 
  onSubmit(flightForm: NgForm) {
    if (flightForm.invalid) {
      alert('Please fill in all fields before submitting the form.');
      return;
    }

    this.addFlights(this.destination, this.departure, this.price);
  }
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
      this.clearForm(); // Clear the form fields after successful submission
    } catch (error) {
      console.error('Flight addition error:', error);
    }
  }

  clearForm() {
    this.destination = '';
    this.departure = '';
    this.price = '';
  }

  flights: any[] = [];

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
