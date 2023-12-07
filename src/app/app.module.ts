import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AddFlightsComponent } from './add-flights/add-flights.component';
import { UsersComponent } from './users/users.component';
import { BookedFlightsComponent } from './booked-flights/booked-flights.component';
import { FormsModule } from '@angular/forms';
// firebase

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore,Firestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { LoginComponent } from "./login/login.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { FooterComponent } from "./footer/footer.component";
import { SearchFlightsComponent } from "./search-flights/search-flights.component";
import { CardsComponent } from "./cards/cards.component";
import { MapComponent } from "./map/map.component";
import { CarouselComponent } from "./carousel/carousel.component";

@NgModule({
    declarations: [
        AppComponent,
        SidebarComponent,
        AddFlightsComponent,
        UsersComponent,
        BookedFlightsComponent,
    ],
    providers: [],
    bootstrap: [AppComponent],
    exports: [],
    imports: [
        BrowserModule,
        AppRoutingModule,
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        provideDatabase(() => getDatabase()), FormsModule,
        LoginComponent,
        NavbarComponent,
        FooterComponent,
        SearchFlightsComponent,
        CardsComponent,
        MapComponent,
        CarouselComponent
    ]
})
export class AppModule { }
