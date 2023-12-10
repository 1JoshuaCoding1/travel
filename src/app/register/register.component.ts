import { AuthService } from '../shared/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string = '';
  password: string = '';
  firstName: string = ''; 
  lastName: string = '';
  birthday: string = '';
  contactNum: string = '';

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  register() {
    if (this.email === '' || this.password === '' || this.firstName === '' || this.lastName === '' || this.birthday === '' || this.contactNum === '') {
      alert('Please fill in all the required fields.');
      return;
    }

    this.auth.register(this.email, this.password, this.firstName, this.lastName, this.birthday, this.contactNum);

    this.email = '';
    this.password = '';
    this.firstName = '';
    this.lastName = '';
    this.birthday = '';
    this.contactNum = '';
  }
}
