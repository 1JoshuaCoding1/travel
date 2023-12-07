import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookedFlightsComponent } from './booked-flights/booked-flights.component';
import { AddFlightsComponent } from './add-flights/add-flights.component';
import { UsersComponent } from './users/users.component';
import { SidebarComponent } from './sidebar/sidebar.component';


const routes: Routes = [
  
  { path: 'users', component: UsersComponent },
  { path: 'booked-flights', component: BookedFlightsComponent },
  { path: 'add-flights', component: AddFlightsComponent},
  

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
