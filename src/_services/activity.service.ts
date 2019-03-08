import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ActivityModel } from '../_models';
import {AppConfig} from '../app/app.config';
import { Observable } from 'rxjs';

@Injectable()
export class ActivityService {
    constructor(private http: HttpClient,
                private config: AppConfig) { }

    getAll (): Observable<ActivityModel[]> {
        return this.http.get<ActivityModel[]>(`${this.config.apiUrl}/activities/`);
    }

    getById(id: string): Observable<ActivityModel> {
        return this.http.get<ActivityModel>(`${this.config.apiUrl}/activities/` + id);
    }

    create(activity) {
        return this.http.post(`${this.config.apiUrl}/activities/create`, activity);
    }

    update(activity: ActivityModel) {
        return this.http.put(`${this.config.apiUrl}/activities/` + activity._id, activity);
    }

    delete(id: string) {
        return this.http.delete(`${this.config.apiUrl}/activities/` + id);
    }
}
