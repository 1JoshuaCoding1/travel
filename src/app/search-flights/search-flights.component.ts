// Import the required modules
import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../shared/auth.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-search-flights',
  standalone: true,
  imports: [CommonModule,FormsModule ], 
  styleUrls: ['./search-flights.component.css'],
   templateUrl: './search-flights.component.html',
})


export class SearchFlightsComponent {
  totalPassengers: number = 1;
  numAdults: number = 1;
  numChildren: number = 0;
  numToddler: number = 0;
  from:string = '';
  destination:string = '';
  departureDate:string = '';
  returnDate:string = '';
  formattedDepartureDate:string ='';
  formattedReturnDate:string ='';
  typeFlight:string = '';

  constructor(private router: Router,private datePipe: DatePipe) {}

  
  onSearchFlightsClick() {
    this.from.toLowerCase;
    this.destination.toLowerCase
    this.formattedDepartureDate = this.datePipe.transform(this.departureDate, 'dd MMMM yyyy') ?? '';
    this.formattedReturnDate = this.datePipe.transform(this.returnDate, 'dd MMMM yyyy') ?? '';
    this.router.navigate(['/view-flights'], {
      queryParams: {
        typeFlight:this.typeFlight,
        totalPassengers: this.totalPassengers,
        numAdults: this.numAdults,
        numChildren: this.numChildren,
        numToddler: this.numToddler,
        from: this.from,
        destination: this.destination,
        departureDate: this.formattedDepartureDate,
        returnDate: this.formattedReturnDate,
      },
    });
    // const searchData = {
    //   typeOfFlight: 'Round-Trip',
    //   totalPassengers: this.totalPassengers,
    //   numAdults: this.numAdults,
    //   numChildren:this.numChildren,
    //   numToddler:this.numToddler,
    //   from: this.from,
    //   destination:this.destination,
    //   departureDate: this.departureDate,
    //   returnDate:this.returnDate,
    // };
    // this.router.navigate(['/view-flights', { searchData }]);
  }
  

  ngOnInit() {
    this.numAdults = 1;
    this.typeFlight = "One way";
    document.addEventListener("DOMContentLoaded", () => {
      
      const typeFlight = document.getElementById("TypeFlight") as HTMLSelectElement;
      const returnDateInput = (document.getElementById("returnDate")?.parentNode?.parentNode as HTMLElement) ?? null;

      const handleButtonClick = (action: string, countElementId: string) => {
        const countElement = document.getElementById(countElementId) as HTMLHeadingElement;
        let currentValue = parseInt(countElement.innerText);
  
        if (action === "increase") {
          countElement.innerText = (currentValue + 1).toString();
        } else if (action === "decrease" && currentValue > 0) {
          countElement.innerText = (currentValue - 1).toString();
        }

        this.updateTotalPassengers();
      };

    
    

      document.getElementById("btn-increase-children")?.addEventListener("click", function () {
        handleButtonClick("increase", "numChildren");
      });
      document.getElementById("btn-decrease-children")?.addEventListener("click", function () {
        handleButtonClick("decrease", "numChildren");
      });
      document.getElementById("btn-increase-toddler")?.addEventListener("click", function () {
        handleButtonClick("increase", "numToddlers");
      });
      document.getElementById("btn-decrease-toddler")?.addEventListener("click", function () {
        handleButtonClick("decrease", "numToddlers");
      });
      document.getElementById("btn-increase-adults")?.addEventListener("click", function () {
        handleButtonClick("increase", "numAdults");
      });
      
      document.getElementById("btn-decrease-adults")?.addEventListener("click", function () {
        handleButtonClick("decrease", "numAdults");
      });

      function toggleReturnDate() {
        if (returnDateInput) {
          returnDateInput.style.display = typeFlight.value === "Round Trip" ? "block" : "none";
        }
        else{

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

   updateTotalPassengers() {

    const numAdults = parseInt(document.getElementById("numAdults")?.innerText || "1", 10);
    const numChildren = parseInt(document.getElementById("numChildren")?.innerText || "0", 10);
    const numToddlers = parseInt(document.getElementById("numToddlers")?.innerText || "0", 10);
    this.numAdults = numAdults;
    this.numChildren = numChildren;
    this.numToddler = numToddlers
    this.totalPassengers = numAdults + numChildren + numToddlers;
  }



}
