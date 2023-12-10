import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private fireauth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {}

 

  login(email: string, password: string) {
    console.log('Attempting to log in with email:', email);
    this.fireauth.signInWithEmailAndPassword(email, password).then(res => {
      console.log('Login successful:', res);
  
      localStorage.setItem('token', 'true');
  
      // Get the username
      const username = res.user?.displayName || res.user?.email;
  
      // Navigate to the homepage and pass the username as a query parameter
      this.router.navigate(['/homepage'], {queryParams: {username}});
    }).catch(err => {
      console.error('Login error:', err);
      alert(err.message);
      this.router.navigate(['/login']);
    });
  }
  
  
  // Register method with additional user details
  register(email: string, password: string, firstName: string, lastName: string, birthday: string, contactNum: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(res => {
      const user = {
        uid: res.user?.uid,
        email: email,
        firstName: firstName,
        lastName: lastName,
        birthday: birthday,
        contactNum: contactNum
      };

      this.firestore.collection('users').doc(res.user?.uid).set(user).then(() => {
        alert('Registration Successful');
        this.sendEmailVerification(res.user); // Use sendEmailVerification here
        this.router.navigate(['/login']);
      }).catch(err => {
        alert('Error creating user document in Firestore: ' + err.message);
        this.router.navigate(['/register']);
      });

    }, err => {
      alert(err.message);
      this.router.navigate(['/register']);
    });
  }


  // Corrected method for sending email verification
  private sendEmailVerification(user: any) {
    user.sendEmailVerification().then((res: any) => {
      this.router.navigate(['/varify-email']);
    }).catch((err: any) => {
      alert('Something went wrong. Not able to send mail to your email.');
    });
  }
}


