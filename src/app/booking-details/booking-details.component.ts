import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { Router, NavigationExtras} from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import Swal from 'sweetalert2';


export class bookings {
  constructor(
    public Booking_ID: string,
    public Lab_Name: string,
    public Lab_Slot: string,
    public Num_Bookings: string,
    public Stud_ID: string,
   
  ) {
  }
}


@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})


export class BookingDetailsComponent implements OnInit {

  constructor(private http:HttpClient,private router: Router) { }
  
  tittle: string;
  booking:bookings[];
 

  ngOnInit(): void {
    this.tittle = JSON.parse(localStorage.getItem("token"))
    this.getBookings();

  }

  

  getBookings(){
    
    this.http.get<any>('http://localhost:3000/bookingStatus').subscribe(
      response => {
       
        
        this.booking= response;
     
        console.log(response);
      }
    );

    

  }

}
