import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/compat';
import { getFirestore, query, where, getDocs } from 'firebase/firestore';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{
  searchData:any;
  firestore: any;
  chosenFlights: any[] = [];
  

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.searchData = params;
      console.log(this.searchData.totalPrice);
    });

  }
  
  
}
