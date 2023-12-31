import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'travel';

  constructor(public authService: AuthService) {}

  showComponents(): boolean {
    return this.authService.isAuthenticated();
  }
}
