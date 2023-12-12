import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Firestore, collection, addDoc, getDocs, doc, deleteDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-add-flights',
  templateUrl: './add-flights.component.html',
  styleUrls: ['./add-flights.component.css']
})
export class AddFlightsComponent implements OnInit {
  destination: string = '';
  departure: string = '';
  price: string = '';
  airline: string = '';
  flightID: string = '';
  baggage: string = '';
  cabinBaggage: string = '';
  departureDate: string = '';
  departureDuration: string = '';
  departureTime: string = '';
  destinationAirport: string = '';
  fromAirport: string = '';

  flights: any[] = [];

  constructor(private fs: Firestore) {}

  ngOnInit() {
    this.getFlights();
  }

  onSubmit(flightForm: NgForm) {
    if (flightForm.invalid) {
      alert('Please fill in all fields before submitting the form.');
      return;
    }

    this.addFlights(
      this.airline,
      this.flightID,
      this.destination,
      this.departure,
      this.price,
      this.baggage,
      this.cabinBaggage,
      this.departureDate,
      this.departureDuration,
      this.departureTime,
      this.destinationAirport,
      this.fromAirport
    );
  }

  async addFlights(
    airline: string,
    flightID: string,
    destination: string,
    departure: string,
    price: string,
    baggage: string,
    cabinBaggage: string,
    departureDate: string,
    departureDuration: string,
    departureTime: string,
    destinationAirport: string,
    fromAirport: string
  ) {
    const flightData = {
      airline,
      flightID,
      destination,
      departure,
      price,
      baggage,
      cabinBaggage,
      departureDate,
      departureDuration,
      departureTime,
      destinationAirport,
      fromAirport
    };

    try {
      const flightsCollection = collection(this.fs, 'flights');
      await addDoc(flightsCollection, flightData);
      console.log('Flight added successfully');
      this.clearForm();
      this.getFlights();
    } catch (error) {
      console.error('Flight addition error:', error);
    }
  }

  clearForm() {
    this.airline = '';
    this.flightID = '';
    this.destination = '';
    this.departure = '';
    this.price = '';
 
    this.baggage = '';
    this.cabinBaggage = '';
    this.departureDate = '';
    this.departureDuration = '';
    this.departureTime = '';
    this.destinationAirport = '';
    this.fromAirport = '';
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
  refreshTable() {
    this.getFlights();
  }
}
