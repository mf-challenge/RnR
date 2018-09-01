import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { DateTimePickerTimezone } from '@ux-aspects/ux-aspects';
import { Subscription } from 'rxjs/Subscription';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { debounceTime } from 'rxjs/operators';
import { Web3EmbeddedService } from './web3-embedded.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  
  constructor(private web3Service: Web3EmbeddedService) { 
this.web3Service.getRewardsReceived("0x9699e9c75366cd824ab8711801cc2390e9778978")
	.then(receipt => console.log("receipt is ", receipt));
	
	this.web3Service.getBalance("a","b")
	.then(receipt => console.log("token balance is ", receipt));;
  }
}
