import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {User} from './entity/user';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  url = 'http://btpvm5602.hpeswlab.net:3000/';
  constructor(private http: HttpClient) { }

  registerUser(user) {

//let restHeaders = new HttpHeaders().set('Content-Type', 'application/json');
let restHeaders = new HttpHeaders(
  {'Content-Type': 'application/json'}
  );

    return  this.http.post<User>(this.url+'users/signUp', user, { headers: restHeaders });
  }
}
