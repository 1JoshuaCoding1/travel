import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
  constructor(
    private fireauth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {}

 

  login(email: string, password: string) {
    console.log('Attempting to log in with email:', email);
    this.fireauth.signInWithEmailAndPassword(email, password).then(res => {
      console.log('Login successful:', res);
  
      // Check if the logged-in user is admin
      const isAdmin = this.isAdmin(res.user?.email);
  
      if (isAdmin) {
        
        this.router.navigate(['/layout']);
      } else {
       
        this.isLoggedIn = true;
      }
    }).catch(err => {
      // Handle login error
      console.error('Login error:', err);
      alert(err.message);
      this.router.navigate(['/login']);
    });
  }
  
  private isAdmin(email: string | null | undefined): boolean {

    return email?.toLowerCase() === 'admin@gmail.com';
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
 
  getCurrentUser(): Observable<any> {
    return this.fireauth.authState;
  }
  logout() {

    this.isLoggedIn = false;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

}


