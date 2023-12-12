import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-view-flights',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-flights.component.html',
  styleUrls: ['./view-flights.component.css']
})
export class ViewFlightsComponent implements OnInit {
  selectedFlightIndex: number | null = null;
  selectedFlights: any[] = [];
  childPrice: number = 0;
  infantPrice: number = 0;
  adultPrice: number = 0;
  totalPrice: number = 0;
  searchData: any;

  constructor(private router: Router, private route: ActivatedRoute, private firestore: AngularFirestore) {}

  ngOnInit() {
    // Retrieve the data from the route
    this.route.queryParams.subscribe((params) => {
      this.searchData = params;
      console.log(this.searchData.typeFlight);
    });
    this.getSelectedFlights();
  }
  onBookFlightClick(flight: any) {

    this.router.navigate(['/checkout'], {
      queryParams: {
        flightId: flight.flightID,
        numAdults: this.searchData.numAdults,
        numChildren: this.searchData.numChildren,
        numToddler: this.searchData.numToddler,
        adultPrice: this.adultPrice,
        childPrice:this.childPrice,
        infantPrice:this.infantPrice,
        totalPrice: flight.totalPrice
      }
    });
  }
  getSelectedFlights() {
    const departureDate = this.searchData.departureDate;
    const departureLocation = this.searchData.from;
    const destinationLocation = this.searchData.destination;

    // Query Firestore for flights with the same departure date and location
    this.firestore
      .collection('flights', (ref:any) =>
        ref
          .where('departure', '==', departureLocation)
          .where('destination', '==', destinationLocation)
          .where('departureDate', '==', departureDate)
      )
      .get()
      .subscribe((querySnapshot) => {
        this.selectedFlights = querySnapshot.docs.map((doc) => {
          const flightData: any = doc.data();
          this.adultPrice = this.searchData.numAdults * flightData.price;
          this.childPrice = this.searchData.numChildren * flightData.price * 0.8; // subtract 20%
          this.infantPrice = this.searchData.numToddler * flightData.price * 0.5; // subtract 50%
          flightData.totalPrice = this.adultPrice + this.childPrice + this.infantPrice;
          return flightData;
        });
        // Now, this.selectedFlights contains the flights with the specified criteria
        console.log(this.selectedFlights);
      });
  }

  showFlightDetails: boolean = true;
  showPriceDetails: boolean = false;
  selectedTab: string = 'flightDetailsContainer';

  toggleContainer(container: string): void {
    this.selectedTab = container;
    if (container === 'flightDetailsContainer') {
      this.showFlightDetails = true;
      this.showPriceDetails = false;
    } else if (container === 'priceDetailsContainer') {
      this.showFlightDetails = false;
      this.showPriceDetails = true;
    }
  }
}
