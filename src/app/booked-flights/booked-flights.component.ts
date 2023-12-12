import { Component } from '@angular/core';
import { Firestore, collection, getDocs, deleteDoc, doc } from '@angular/fire/firestore';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../shared/auth.service';
import { documentId } from 'firebase/firestore';

@Component({
  selector: 'app-booked-flights',
  templateUrl: './booked-flights.component.html',
  styleUrls: ['./booked-flights.component.css']
})
export class BookedFlightsComponent {

  bookedFlights: any[] = [];

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getBookedFlights();
  }

  getBookedFlights() {
    this.firestore
      .collectionGroup('bookedFlights') 
      .valueChanges()
      .subscribe((flights: any[]) => {
        this.bookedFlights = flights;
      });
  }

  

  
  async deleteFlight(documentId: string) {
    const flightRef = this.firestore.collection('bookedFlights').doc(documentId);

    try {
      await flightRef.delete();
      console.log('Flight deleted successfully');
      this.getBookedFlights(); 
    } catch (error) {
      console.error('Flight deletion error:', error);
    }
  }

  refreshBookedFlights() {
    this.getBookedFlights(); 
  }
}
