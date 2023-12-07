// Angular modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Firebase modules

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { Auth, provideAuth, getAuth } from '@angular/fire/auth';
import { Firestore, provideFirestore, getFirestore } from '@angular/fire/firestore';
import { Database, provideDatabase, getDatabase } from '@angular/fire/database';

// Other modules
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AddFlightsComponent } from './add-flights/add-flights.component';
import { UsersComponent } from './users/users.component';
import { BookedFlightsComponent } from './booked-flights/booked-flights.component';

import { environment } from 'src/environments/environment';



@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    AddFlightsComponent,
    UsersComponent,
    BookedFlightsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
