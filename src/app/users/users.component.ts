
import { Component, OnInit } from '@angular/core';
import { Firestore, collection, getDocs, deleteDoc, doc } from '@angular/fire/firestore';
import { Router } from '@angular/router';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  selectedUser: any;
  bookedFlights: any[] = [];

  constructor(private fs: Firestore) {}

  ngOnInit() {
    this.getUsers();
  }

  async getUsers() {
    const usersCollection = collection(this.fs, 'users');
    const querySnapshot = await getDocs(usersCollection);
  
    this.users = [];
    querySnapshot.forEach((doc) => {
      const userData = { id: doc.id, ...doc.data() };
      console.log('User Data:', userData);
      this.users.push(userData);
    });
  }

  async deleteUser(userId: string) {
    const userDoc = doc(this.fs, 'users', userId);

    try {
      await deleteDoc(userDoc);
      console.log('User deleted successfully');
      this.getUsers();
    } catch (error) {
      console.error('User deletion error:', error);
    }
  }

  async viewFlights(user: any) {
    this.selectedUser = user;
    const bookedFlightsCollection = collection(this.fs, 'users', user.id, 'bookedFlights');
    const querySnapshot = await getDocs(bookedFlightsCollection);
  
    this.bookedFlights = [];
    querySnapshot.forEach((doc) => {
      const flightData = { id: doc.id, ...doc.data() };
      console.log('Booked Flight Data:', flightData);
      this.bookedFlights.push(flightData);
    });
  }
  

  
async refreshTable() {
  try {
    
    await this.getUsers();
    console.log('Table refreshed successfully');
  } catch (error) {
    console.error('Table refresh error:', error);
  }
}

}
