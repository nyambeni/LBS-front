import { Component, OnInit } from '@angular/core';
import { Details, LoginComponent } from '../login/login.component';
import { Router, NavigationExtras} from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http:HttpClient,private router: Router) { }

  ngOnInit(): void {
    
  }

  stud_Name = Details[1]
  stud_Surname = Details[2]


  onClick()
  {
    this.router.navigate(['/home']);
  }
}
