import { Injectable } from '@angular/core';
import { User } from '../entity/user';
import { Web3EmbeddedService } from '../web3-embedded.service';
import { UserManagementService } from '../user-management.service'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private web3: Web3EmbeddedService, private userManagementService: UserManagementService) { }

  registerUser(user: User) {
    // Register a wallet
    let address: any = this.web3.loadAccount(user.username, user.password, 1);
    user.address = address;
    console.log("New user address created as " +address);

    // Save user meta data
    this.userManagementService.registerUser(user).subscribe(resp  => {
     // console.log(resp);
    });
  }

  authenticateUser(user: User) {

    // Get user meta data
    this.userManagementService.authenticateUser(user).subscribe(resp  => {
       console.log(resp);
     });
  }
}
