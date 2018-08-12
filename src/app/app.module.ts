import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TimePickerModule } from '@ux-aspects/ux-aspects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DateTimePickerModule, CheckboxModule, PopoverModule } from '@ux-aspects/ux-aspects';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

import { PageHeaderModule } from '@ux-aspects/ux-aspects';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TransactionListComponent } from './directive/transaction-list/transaction-list.component';
import { AccountSummaryComponent } from './directive/account-summary/account-summary.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    TransactionListComponent,
    AccountSummaryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DateTimePickerModule,
    CheckboxModule,
    PopoverModule,
    AccordionModule.forRoot(),
    RouterModule,
    AppRoutingModule,
    TimePickerModule,
    PageHeaderModule, 
    BsDropdownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
