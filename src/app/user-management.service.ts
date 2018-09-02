import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { User } from './entity/user';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  url = 'http://btpvm5602.hpeswlab.net:3000/';
  constructor(private http: HttpClient) { }

  registerUser(user: User) {

    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });

    return this.http.post<User>(this.url + 'users/signUp', user, { headers: headers });
  }


  authenticateUser(user: User) {

    let authStr = user.username + ":" + user.password;
    console.log("Auth str:" + authStr);
    let base64Auth = btoa(authStr);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Basic ' +base64Auth
    });

    console.log(btoa(user.username + ":" + user.password));

    return this.http.get<User>(this.url + 'users/signIn', { headers: headers });
  }
  
  lookupUser(address: String) {
  
	return this.http.get(this.url + 'users/address/'+address);
  }
  
  lookupAddress(user: String) {
  
	return this.http.get(this.url + 'users/username/'+user);
  }
  
}
