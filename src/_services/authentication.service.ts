import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AppConfig } from '../app/app.config';
import { Storage } from '@ionic/storage';
import { Events } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {
    HAS_LOGGED_IN = 'hasLoggedIn';
    constructor(
        public storage: Storage,
        public events: Events,
        private http: HttpClient,
        private config: AppConfig,
        private router: Router,
                ) { }

    isLoggedIn(): boolean {
        return localStorage.getItem('currentUser') ? true : false;
    }

    login(username: string, password: string) {
        return this.http.post<any>(this.config.apiUrl + '/users/authenticate', { username: username, password: password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
                        this.setUser( JSON.stringify(user));
                        return this.events.publish('user:login');
                    });
                }
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.router.navigateByUrl('/login');
    }

    setUser(user: any) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', user);
    }
}
