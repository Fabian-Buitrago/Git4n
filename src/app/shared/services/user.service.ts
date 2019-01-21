import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
    baseUrl = "https://api.github.com/users/";

    constructor(private http: HttpClient) { }

    get(user): Observable<any> {
        return this.http.get(`${this.baseUrl}${user}/repos`);
    }
}