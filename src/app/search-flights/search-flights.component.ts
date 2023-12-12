// Import the required modules
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-flights',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./search-flights.component.css'],
  templateUrl: './search-flights.component.html',
})
export class SearchFlightsComponent implements OnInit {
  totalPassengers: number = 1;
  seatClass:string = ''
  numAdults: number = 1;
  numChildren: number = 0;
  numToddler: number = 0;
  from: string = '';
  destination: string = '';
  departureDate: string = '';
  returnDate: string = '';
  formattedDepartureDate: string = '';
  formattedReturnDate: string = '';
  typeFlight: string = '';

  constructor(private router: Router, private datePipe: DatePipe) {}

  onSearchFlightsClick() {
    this.from = this.from.toLowerCase();
    this.destination = this.destination.toLowerCase();
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

  updateTotalPassengers() {
    const numAdults = parseInt(document.getElementById('numAdults')?.innerText || '1', 10);
    const numChildren = parseInt(document.getElementById('numChildren')?.innerText || '0', 10);
    const numToddlers = parseInt(document.getElementById('numToddlers')?.innerText || '0', 10);
    this.numAdults = numAdults;
    this.numChildren = numChildren;
    this.numToddler = numToddlers;
    this.totalPassengers = numAdults + numChildren + numToddlers;
  }

  ngOnInit() {
    this.numAdults = 1;
    this.typeFlight = 'One way';
    document.addEventListener('DOMContentLoaded', () => {
      const typeFlight = document.getElementById('TypeFlight') as HTMLSelectElement;
      const returnDateInput = (document.getElementById('returnDate')?.parentNode?.parentNode as HTMLElement) ?? null;

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

      document.getElementById('btn-increase-children')?.addEventListener('click', function () {
        handleButtonClick('increase', 'numChildren');
      });
      document.getElementById('btn-decrease-children')?.addEventListener('click', function () {
        handleButtonClick('decrease', 'numChildren');
      });
      document.getElementById('btn-increase-toddler')?.addEventListener('click', function () {
        handleButtonClick('increase', 'numToddlers');
      });
      document.getElementById('btn-decrease-toddler')?.addEventListener('click', function () {
        handleButtonClick('decrease', 'numToddlers');
      });
      document.getElementById('btn-increase-adults')?.addEventListener('click', function () {
        handleButtonClick('increase', 'numAdults');
      });

      document.getElementById('btn-decrease-adults')?.addEventListener('click', function () {
        handleButtonClick('decrease', 'numAdults');
      });
    });
  }
}
