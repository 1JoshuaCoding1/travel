// users.component.ts
import { Component, OnInit } from '@angular/core';
import { Firestore, collection, getDocs, deleteDoc, doc } from '@angular/fire/firestore';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; // Import NgbModal
import { Router } from '@angular/router';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: any[] = [];

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
      this.getUsers(); // Refresh the users data after deletion
    } catch (error) {
      console.error('User deletion error:', error);
    }
  }



  async refreshTable() {
    try {
      // Fetch updated user data
      await this.getUsers();
      console.log('Table refreshed successfully');
    } catch (error) {
      console.error('Table refresh error:', error);
    }
  }

  viewFlights(userId: number,) {
    // Open a modal to display flight details
    this.getFlights(userId);
    
  }

  async getFlights(userId: number) {
    // Logic to fetch flight details based on userId
    // Update the flights data in the component for display in the modal
  }
}

