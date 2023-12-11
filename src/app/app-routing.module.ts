import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookedFlightsComponent } from './booked-flights/booked-flights.component';
import { AddFlightsComponent } from './add-flights/add-flights.component';
import { UsersComponent } from './users/users.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SearchFlightsComponent } from './search-flights/search-flights.component';
import { ViewFlightsComponent } from './view-flights/view-flights.component';


const routes: Routes = [
  
  { path: 'users', component: UsersComponent },
  { path: 'booked-flights', component: BookedFlightsComponent },
  { path: 'add-flights', component: AddFlightsComponent},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'homepage',component:HomepageComponent},
  { path: 'search-flights', component: SearchFlightsComponent },
  { path: 'view-flights', component: ViewFlightsComponent },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
