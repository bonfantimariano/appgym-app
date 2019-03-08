import { Component } from '@angular/core';
import {AuthenticationService} from '../../_services';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  loggedIn: boolean;
  constructor( private authService: AuthenticationService ) {
    this.loggedIn = authService.isLoggedIn();
    this.initializeApp();
  }

  initializeApp() {
    console.log('isLoggedIn: ', this.loggedIn);
  }

}
