import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ClientModel } from '../_models';
import {AppConfig} from '../app/app.config';
import { Observable } from 'rxjs';

@Injectable()
export class ClientService {
    constructor(private http: HttpClient,
                private config: AppConfig) { }

    getAll (): Observable<ClientModel[]> {
        return this.http.get<ClientModel[]>(`${this.config.apiUrl}/clients/`);
    }

    getById(id: string): Observable<ClientModel> {
        return this.http.get<ClientModel>(`${this.config.apiUrl}/clients/` + id);
    }

    create(client) {
        return this.http.post(`${this.config.apiUrl}/clients/create`, client);
    }

    update(client: ClientModel) {
        return this.http.put(`${this.config.apiUrl}/clients/` + client._id, client);
    }

    delete(id: string) {
        return this.http.delete(`${this.config.apiUrl}/clients/` + id);
    }
}
