import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import Swal from 'sweetalert2';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private http:HttpClient,private router: Router) { }

  ngOnInit(): void {
  }

  onClick()
  {
    //navigate to the login page
    this.router.navigate(['/login']);
  }

}
