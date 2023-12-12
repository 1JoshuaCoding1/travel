    import { Component } from '@angular/core';
    import { CommonModule } from '@angular/common';
    import { NavbarComponent } from "../navbar/navbar.component";
    import { SearchFlightsComponent } from "../search-flights/search-flights.component";
    import { CardsComponent } from "../cards/cards.component";
    import { MapComponent } from "../map/map.component";
    import { CarouselComponent } from "../carousel/carousel.component";
    import { FooterComponent } from "../footer/footer.component";
    import { RouterModule } from '@angular/router';
    import { FormsModule } from '@angular/forms';
    import { CheckoutComponent } from '../checkout/checkout.component';

    @Component({
        selector: 'app-homepage',
        standalone: true,
        templateUrl: './homepage.component.html',
        styleUrls: ['./homepage.component.css',],
        imports: [CommonModule, NavbarComponent, SearchFlightsComponent, CardsComponent, MapComponent, CarouselComponent, FooterComponent, RouterModule]
    })
    export class HomepageComponent {

    }
