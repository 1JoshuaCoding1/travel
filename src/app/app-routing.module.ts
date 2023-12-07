import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookedFlightsComponent } from './booked-flights/booked-flights.component';
import { AddFlightsComponent } from './add-flights/add-flights.component';
import { UsersComponent } from './users/users.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  
  { path: 'users', component: UsersComponent },
  { path: 'booked-flights', component: BookedFlightsComponent },
  { path: 'add-flights', component: AddFlightsComponent},
  {path:'login', component:LoginComponent},
  

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
