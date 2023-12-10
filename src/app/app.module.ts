import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

// Firebase modules
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { Auth, provideAuth, getAuth } from '@angular/fire/auth';
import { Firestore, provideFirestore, getFirestore } from '@angular/fire/firestore';
import { Database, provideDatabase, getDatabase } from '@angular/fire/database';

import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AddFlightsComponent } from './add-flights/add-flights.component';
import { UsersComponent } from './users/users.component';
import { BookedFlightsComponent } from './booked-flights/booked-flights.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SearchFlightsComponent } from './search-flights/search-flights.component';
import { CardsComponent } from './cards/cards.component';
import { MapComponent } from './map/map.component';
import { CarouselComponent } from './carousel/carousel.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RegisterComponent } from './register/register.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutComponent } from './layout/layout.component';


@NgModule({
    declarations: [
        AppComponent,
        SidebarComponent,
        AddFlightsComponent,
        UsersComponent,
        BookedFlightsComponent,RegisterComponent,LoginComponent, LayoutComponent
     
    ],
    providers: [
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig), 
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        provideDatabase(() => getDatabase()),
        AngularFireAuthModule,  NavbarComponent,
        SearchFlightsComponent,
        CardsComponent,
        MapComponent,
        CarouselComponent,
        FooterComponent
        ,HomepageComponent, NgbModule
    ]
})
export class AppModule { }
