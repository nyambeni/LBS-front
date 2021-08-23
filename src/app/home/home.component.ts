import { Component, OnInit } from '@angular/core';
import { Details, LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  }

  stud_Name = Details[1]
  stud_Surname = Details[2]

}
