import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

//import service class
import {IssueService} from './issue.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

import { BrowserModule } from  '@angular/platform-browser';
import { NgModule } from  '@angular/core';
import { AppComponent } from  './app.component';
import { NgOtpInputModule } from  'ng-otp-input';
@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [IssueService],
  bootstrap: [AppComponent]
})
export class AppModule { }
