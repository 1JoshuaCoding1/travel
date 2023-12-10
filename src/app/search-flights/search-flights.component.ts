// Import the required modules
import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../shared/auth.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-search-flights',
  standalone: true,
  styleUrls: ['./search-flights.component.css'],
  templateUrl: './search-flights.component.html',
  imports: [CommonModule, FormsModule],
})
export class SearchFlightsComponent {
  private authSubscription: Subscription | undefined;

  // Properties for two-way binding
  typeOfFlight: string = '';
  seatClass: string = '';
  from: string = '';
  destination: string = '';
  departureDate: string = '';
  returnDate: string = '';

  constructor(private afs: AngularFirestore, private authService: AuthService) {}

  ngOnDestroy() {
    // Unsubscribe when the component is destroyed
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  bookFlight() {
    // Placeholder: In a real app, get the actual user ID based on authentication
    this.authSubscription = this.authService.getCurrentUser().subscribe((user) => {
      const userId = user ? user.uid : null;

      if (!userId) {
        // Handle the case where the user is not authenticated
        console.error('User not authenticated');
        return;
      }

      // Prepare data object
      const flightData = {
        typeOfFlight: this.typeOfFlight,
        seatClass: this.seatClass,
        from: this.from,
        destination: this.destination,
        departureDate: this.departureDate,
        returnDate: this.returnDate,
      };

      const userDocRef = this.afs.collection('users').doc(userId);

      userDocRef
        .collection('bookedFlights')
        .add(flightData)
        .then((docRef: { id: any }) => {
          console.log('Document written with ID: ', docRef.id);
          // You can add any further actions here, like showing a success message
        })
        .catch((error: any) => {
          console.error('Error adding document: ', error);
          // Handle errors here
        });
    });
  }
}
