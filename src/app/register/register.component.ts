import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user.service';

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
    this.userService.registerUser(this.email,this.password,this.username);
  }
}
