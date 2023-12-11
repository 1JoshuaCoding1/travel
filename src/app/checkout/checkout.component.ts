import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  searchData:any;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.searchData = params;
      console.log(this.searchData.totalPrice);
    });

  }
    
    // this.route.queryParams.subscribe((params) => {
    //   const flightId = params['flightId'];
    //   const numAdults = params['numAdults'];
    //   const numChildren = params['numChildren'];
    //   const numToddler = params['numToddler'];
    //   const totalPrice = params['totalPrice'];
    //   console.log(totalPrice);
    // });

 
  
}
