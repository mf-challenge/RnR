import { Component, OnInit, Input } from '@angular/core';
import { AfterViewInit, ElementRef, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { DateTimePickerTimezone } from '@ux-aspects/ux-aspects';
import { Subscription } from 'rxjs/Subscription';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

@Input() listheader: string;
@Input() fromToColumn: string;
@Input() dataSet: any[];

  constructor() { }

  ngOnInit() {
    console.log(JSON.stringify(this.dataSet));
  }

  @ViewChild('input') dateInput: ElementRef;

 


  date: Date = new Date();
  timezone: DateTimePickerTimezone = { name: 'GMT', offset: 0 };

  showTime: boolean = true;
  showTimezones: boolean = true;
  showMeridians: boolean = true;
  showSpinners: boolean = true;
  subscription: Subscription;

  ngAfterViewInit(): void {
      this.subscription = fromEvent(this.dateInput.nativeElement, 'input')
          .pipe(debounceTime(500))
          .subscribe(event => this.parse(this.dateInput.nativeElement.value));
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  parse(value: string): void {

      // try and parse the date
      const date = new Date(value);

      // check if the date is valid
      if (!isNaN(date.getDate())) {
          this.date = date;
      }
  }
}
