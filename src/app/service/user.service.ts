import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  registerUser(email,password,username) {
    console.log("UserService.registerUser");
  }

  authenticateUser()
  {
    console.log("UserService.authenticateUser");
  }
}
