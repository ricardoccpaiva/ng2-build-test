import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { myConfig }        from './auth.config';

var options = {
  allowedConnections: ["google-oauth2"],
  disableSignupAction: true,
  theme: {
    logo: 'https://avatars0.githubusercontent.com/u/1223952?v=3&s=58'
  },
  languageDictionary: {
    title: "Fueldesk"
  },
};
declare var Auth0Lock: any;

@Injectable()
export class AuthService {
  userProfile: any;
  // Avoid name not found warnings
  lock = new Auth0Lock('Ijp9yimAidHVaULHv30kkChjvKu9ysZH', 'ricardoccpaiva.eu.auth0.com', options);

  constructor() {
    this.userProfile = JSON.parse(localStorage.getItem('profile'));
    // Add callback for lock `authenticated` event
    this.lock.on("authenticated", (authResult) => {
      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          alert(error);
          return;
        }

        localStorage.setItem('profile', JSON.stringify(profile));
        this.userProfile = profile;
        //console.log(profile);
      });

      localStorage.setItem('id_token', authResult.idToken);
    });
  }

  public login() {
    // Call the show method to display the widget.
    this.lock.show();
  };

  public authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  };

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
  };
}
