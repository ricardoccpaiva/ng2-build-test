import { Component } from '@angular/core';
import { AuthService } from './login/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  profilePicture: String;

  constructor(private authService: AuthService) {
    var userProfile = JSON.parse(localStorage.getItem('profile'));
    if (userProfile != null) {
      this.profilePicture = userProfile.picture;
    }
  }
}
