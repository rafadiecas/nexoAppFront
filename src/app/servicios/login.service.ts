import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Login} from '../modelos/Login';
import {Observable} from 'rxjs';

const apiUrl = '/api/auth';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
  }
  login(login:Login): Observable<any> {
    return this.http.post(`${apiUrl}/login`, login);
  }
}
