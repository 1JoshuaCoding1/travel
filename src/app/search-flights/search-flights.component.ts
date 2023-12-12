
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../shared/auth.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-search-flights',
  standalone: true,
  imports: [CommonModule,FormsModule ],
  templateUrl: './search-flights.component.html',
  styleUrls: ['./search-flights.component.css']
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



  ngOnDestroy() {
    // Unsubscribe when the component is destroyed
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  onSearchFlightsClick() {
    this.from.toLowerCase();
    this.destination.toLowerCase();
    this.formattedDepartureDate = this.datePipe.transform(this.departureDate, 'dd MMMM yyyy') ?? '';
    this.formattedReturnDate = this.datePipe.transform(this.returnDate, 'dd MMMM yyyy') ?? '';
    this.router.navigate(['/view-flights'], {
      queryParams: {
        typeFlight: this.typeFlight,
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
  }
  

  ngOnInit() {
    this.numAdults = 1;
    this.typeFlight = 'One way';

    const typeFlight = document.getElementById('TypeFlight') as HTMLSelectElement;
    const returnDateInput = document.getElementById('returnDate')?.parentNode?.parentNode as HTMLElement;

    const handleButtonClick = (action: string, countElementId: string) => {
      const countElement = document.getElementById(countElementId) as HTMLHeadingElement;
      let currentValue = parseInt(countElement.innerText, 10);

      if (action === 'increase') {
        countElement.innerText = (currentValue + 1).toString();
      } else if (action === 'decrease' && currentValue > 0) {
        countElement.innerText = (currentValue - 1).toString();
      }

      this.updateTotalPassengers();
    };

    document.getElementById('btn-increase-children')?.addEventListener('click', () => {
      handleButtonClick('increase', 'numChildren');
    });
    document.getElementById('btn-decrease-children')?.addEventListener('click', () => {
      handleButtonClick('decrease', 'numChildren');
    });
    document.getElementById('btn-increase-toddler')?.addEventListener('click', () => {
      handleButtonClick('increase', 'numToddlers');
    });
    document.getElementById('btn-decrease-toddler')?.addEventListener('click', () => {
      handleButtonClick('decrease', 'numToddlers');
    });
    document.getElementById('btn-increase-adults')?.addEventListener('click', () => {
      handleButtonClick('increase', 'numAdults');
    });
    document.getElementById('btn-decrease-adults')?.addEventListener('click', () => {
      handleButtonClick('decrease', 'numAdults');
    });

    const toggleReturnDate = () => {
      if (returnDateInput) {
        returnDateInput.style.display = typeFlight.value === 'Round Trip' ? 'block' : 'none';
      }
    };

    toggleReturnDate();

    typeFlight.addEventListener('change', toggleReturnDate);
  }
 
   updateTotalPassengers() {

    const numAdults = parseInt(document.getElementById("numAdults")?.innerText || "1", 10);
    const numChildren = parseInt(document.getElementById("numChildren")?.innerText || "0", 10);
    const numToddlers = parseInt(document.getElementById("numToddlers")?.innerText || "0", 10);
    this.numAdults = numAdults;
    this.numChildren = numChildren;
    this.numToddler = numToddlers;
    this.totalPassengers = numAdults + numChildren + numToddlers;
  }
}