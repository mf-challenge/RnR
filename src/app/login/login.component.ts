import { Component, OnInit } from '@angular/core';
import { Web3EmbeddedService } from '../web3-embedded.service';
import {UserService} from '../service/user.service';
import {User} from '../entity/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private password:string;
  private username:string;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  login(){
    let usr = new User();
    usr.password = this.password;
    usr.username = this.username;
    this.userService.authenticateUser(usr);
  }
}
