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
	this.web3Service.getBalance("test","test@123")
	.then(receipt => console.log("receipt is ", receipt));
  }
}
