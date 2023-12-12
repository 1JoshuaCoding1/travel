    import { Component } from '@angular/core';
    import { CommonModule } from '@angular/common';
    import { NavbarComponent } from "../navbar/navbar.component";
    import { SearchFlightsComponent } from "../search-flights/search-flights.component";
    import { CardsComponent } from "../cards/cards.component";
    import { MapComponent } from "../map/map.component";
    import { CarouselComponent } from "../carousel/carousel.component";
    import { FooterComponent } from "../footer/footer.component";

    @Component({
        selector: 'app-homepage',
        standalone: true,
        templateUrl: './homepage.component.html',
        styleUrls: ['./homepage.component.css',],
        imports: [CommonModule, NavbarComponent, SearchFlightsComponent, CardsComponent, MapComponent, CarouselComponent, FooterComponent]
    })
    export class HomepageComponent {

    }
