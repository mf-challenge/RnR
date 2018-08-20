import { Component, OnInit } from '@angular/core';
import { Web3EmbeddedService } from '../web3-embedded.service';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  login(){
    this.userService.authenticateUser();
  }
}
