import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { Router, NavigationExtras} from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import Swal from 'sweetalert2';

//Exports class for bookings to store database data
export class bookings {
  constructor(
    public Booking_ID: string,
    public Lab_Name: string,
    public Lab_Slot: string,
    public Num_Bookings: string,
    public Stud_ID: string,
    public date: string,
   
  ) {
  }
}
//Exports class for details to store localstorage data
export class Details{
  constructor(
    public stud_no: string,
    public stu_name: string,
    public stud_surname: string,
    public email: string,
  ){}
}

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})


export class BookingDetailsComponent implements OnInit {

  constructor(private http:HttpClient,private router: Router) { }
  //variable to store the token
  tittle: string;
  //array to store the data from the database
  booking:bookings[];
 //array to store the data from the localstorage
 detail: Details[];
 //variable to store the student Number
 stuNumber: number;

  ngOnInit(): void {
    this.tittle = localStorage.getItem("token");
    this.getDetails();
  }

//get Detail funtion that store the data from local storage to the detail array
//and connects to booking API
getDetails(){
  this.detail = JSON.parse(this.tittle);
    this.stuNumber = JSON.parse(this.detail[0].stud_no);
    console.log(this.stuNumber);
     
}

//on submit function that calls the booking detail API
onSubmit(data){
  //Retrieve information from the database
  this.http.post('http://localhost:3000/bookingStatus',data,{responseType:'text'})
  .subscribe((result) =>{
    this.booking = JSON.parse(result);
    console.warn("Results", result);
    //this.booking = result;
  });
  console.warn(data);
}


//On click function for logout
  onClick()
  {
    
    localStorage.removeItem("token");
    this.router.navigate(['/index']);
  }

}