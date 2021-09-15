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

  imageObject: Array<object> = [{
    image: '/assets/images/TUT Gencor.jpg',
    thumbImage: '/assets/images/TUT Gencor.jpg',

  },

  {
    image: 'assets/images/TUT Parking.jpg',
    thumbImage: 'assets/images/TUT Parking.jpg',
  },
  {
    image: 'assets/images/lab1.JPG',
    thumbImage:'assets/images/lab1.JPG',
    text:'',
  },
  {
    image: 'assets/images/lab2.JPG',
    thumbImage:'assets/images/lab2.JPG',
  }
  ]

}

