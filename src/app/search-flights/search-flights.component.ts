import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-flights',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-flights.component.html',
  styleUrls: ['./search-flights.component.css']
})
export class SearchFlightsComponent {
  totalPassengers: number = 0;


  ngOnInit() {
    document.addEventListener("DOMContentLoaded", () => {
      
      // Get the type of flight and return date input elements
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
          returnDateInput.style.display = typeFlight.value === "Round-Trip" ? "block" : "none";
        }
        else{

        }
      }
    

      toggleReturnDate();

      typeFlight.addEventListener("change", toggleReturnDate);
    });
  }
 
   updateTotalPassengers() {
    const numAdults = parseInt(document.getElementById("numAdults")?.innerText || "0", 10);
    const numChildren = parseInt(document.getElementById("numChildren")?.innerText || "0", 10);
    const numToddlers = parseInt(document.getElementById("numToddlers")?.innerText || "0", 10);
  
    this.totalPassengers = numAdults + numChildren + numToddlers;
  }



  
}

