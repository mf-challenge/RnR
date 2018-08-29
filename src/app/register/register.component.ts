import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user.service';
import {User} from '../entity/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private email:string;
  private password:string;
  private username:string;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  singnUp()
  {
    console.log("singnUp");
    let usr = new User();
    usr.email = this.email;
    usr.password = this.password;
    usr.username = this.username;
    this.userService.registerUser(usr);
  }
}
