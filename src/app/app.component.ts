import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from '../_services';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  loggedIn = false;
  public appPages = [
    {
      title: 'Inicio',
      url: '/app/tabs/home',
      icon: 'home'
    },
    {
      title: 'Actividades',
      url: '/activity-list',
      icon: 'baseball'
    }
  ];

  constructor(
      private platform: Platform,
      private events: Events,
      private splashScreen: SplashScreen,
      private statusBar: StatusBar,
      private authService: AuthenticationService
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    this.loggedIn = this.authService.isLoggedIn();
    this.listenForLoginEvents();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    console.log('isLoggedIn: ', this.loggedIn);
  }

  updateLoggedInStatus(loggedIn: boolean) {
    setTimeout(() => {
      this.loggedIn = loggedIn;
    }, 300);
  }

  listenForLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.updateLoggedInStatus(true);
    });

    this.events.subscribe('user:logout', () => {
      this.updateLoggedInStatus(false);
    });
  }

  logout() {
    this.authService.logout();
  }
}
