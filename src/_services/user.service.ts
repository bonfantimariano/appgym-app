import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserModel } from '../_models';
import {AppConfig} from '../app/app.config';

@Injectable()
export class UserService {
    constructor(private http: HttpClient,
                private config: AppConfig) { }

    getAll() {
        return this.http.get<UserModel[]>(`${this.config.apiUrl}/users`);
    }

    getById(id: number) {
        return this.http.get(`${this.config.apiUrl}/users/` + id);
    }

    register(user: UserModel) {
        return this.http.post(`${this.config.apiUrl}/users/register`, user);
    }

    update(user: UserModel) {
        return this.http.put(`${this.config.apiUrl}/users/` + user._id, user);
    }

    delete(id: number) {
        return this.http.delete(`${this.config.apiUrl}/users/` + id);
    }
}
