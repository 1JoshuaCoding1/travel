import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-flights',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-flights.component.html',
  styleUrls: ['./view-flights.component.css']
})
export class ViewFlightsComponent {
  showFlightDetails: boolean = true;
  showPriceDetails: boolean = false;

  toggleContainer(container: string): void {
    if (container === 'flightDetailsContainer') {
      this.showFlightDetails = true;
      this.showPriceDetails = false;
    } else if (container === 'priceDetailsContainer') {
      this.showFlightDetails = false;
      this.showPriceDetails = true;
    }
  }
}