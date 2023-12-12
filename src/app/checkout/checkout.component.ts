import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  searchData: any;
  chosenFlights: any[] = [];
  allFlightsPrice: number = 0;
  userUID: string = '';
  childPrice: number = 0;
  infantPrice: number = 0;
  adultPrice: number = 0;
  totalPrice: number = 0;

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe((user) => {
      if (user) {
        const uid = user.uid;
        this.userUID = uid;
      }
    });
    this.route.queryParams.subscribe((params) => {
      this.searchData = params;
      console.log(this.searchData.totalPrice);
    });
    this.getChosenFlight();
  }

  getChosenFlight() {
    const flightID = this.searchData.flightId;

    this.firestore
      .collection('flights', (ref: any) => ref.where('flightID', '==', flightID))
      .get()
      .subscribe((querySnapshot: any) => {
        this.chosenFlights = querySnapshot.docs.map((doc: any) => {
          const chosenFlightsData: any = doc.data();

          chosenFlightsData.numAdults = this.searchData.numAdults;
          chosenFlightsData.numChildren = this.searchData.numChildren;
          chosenFlightsData.numToddler = this.searchData.numToddler;
          chosenFlightsData.adultPrice = this.searchData.adultPrice;
          chosenFlightsData.childPrice = this.searchData.childPrice;
          chosenFlightsData.infantPrice = this.searchData.infantPrice;
          return chosenFlightsData;
        });
      });

    this.calculateTotalPrice();
  }

  calculateTotalPrice() {
    this.allFlightsPrice = this.searchData.totalPrice;
  }

  onClickCheckout() {

    const isConfirmed = window.confirm('Are you sure you want to book this flight?');

    if (isConfirmed) {

      this.bookFlight();
    } else {
// to add decline
    }
  }

  bookFlight() {

    const additionalDetails = {
      numAdults: this.searchData.numAdults,
      numChildren: this.searchData.numChildren,
      numToddler: this.searchData.numToddler,
      adultPrice: this.searchData.adultPrice,
      childPrice: this.searchData.childPrice,
      infantPrice: this.searchData.infantPrice
    };

    const flightDataWithDetails = { ...this.chosenFlights[0], ...additionalDetails };

    this.firestore
      .collection('users')
      .doc(this.userUID)
      .collection('bookedFlights')
      .add(flightDataWithDetails);
  }
}
