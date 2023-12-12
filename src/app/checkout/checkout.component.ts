import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/compat';
import {  getDocs, DocumentData, QuerySnapshot } from 'firebase/firestore';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{
  searchData:any;
  chosenFlights: any[] = [];
  allFlightsPrice:number = 0;
  

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => { 
      this.searchData = params;
      console.log(this.searchData.totalPrice);
    });
    this.getChosenFlight();
  }
  getChosenFlight() {
    const flightID = this.searchData.flightId;
  
    this.firestore
      .collection('flights', (ref:any) => ref.where('flightID', '==', flightID))
      .get()
      .subscribe((querySnapshot:any) => {
        this.chosenFlights = querySnapshot.docs.map((doc:any) => {
          const chosenFlightsData: any = doc.data();
          
          return chosenFlightsData;
        });

      });
      console.log(this.searchData.flightId);
      this.calculateTotalPrice();
  }
  calculateTotalPrice(){
  this.allFlightsPrice = this.searchData.totalPrice
  }
  
}
