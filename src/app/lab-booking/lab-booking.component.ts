////////******************************************************************************
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder,Validators } from '@angular/forms';
import { IssueService } from '../issue.service';
import { Router} from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import Swal from 'sweetalert2';
import { GroupedObservable } from 'rxjs';
import { __values } from 'tslib';
import { FormsModule } from '@angular/forms';
import { typeWithParameters } from '@angular/compiler/src/render3/util';

//storing info receiced from the console
//
export class Labs {
  constructor(
    public Lab_Name: string,
    public Lab_Slot: string,

   
  ) {
  }
}
//export class for students for storing data from localstorage
export class students {
  constructor(
    public stud_no: string,
    public stu_name: string,
    public stud_surname: string,

    
  ) {
  }
}


@Component({
  selector: 'app-lab-booking',
  templateUrl: './lab-booking.component.html',
  styleUrls: ['./lab-booking.component.css']
})
export class LabBookingComponent implements OnInit {
  /*
  reloadCurrentRoute() {
    let currentUrl = this._router.url;
    this._router.navigateByUrl('/lab-booking', {skipLocationChange: true}).then(() => {
        this._router.navigate([currentUrl]);
        console.log(currentUrl);
    });
  }*/
  //constructor
  constructor(private http:HttpClient, private router: Router, private fb:FormBuilder) { }
  //lab array that store the labs from the database
  lab: Labs[];
  //variable that holds a token
  tittle:string
  //students array that holds data retrieved from localstorage
  student:students[];
  //variable that holds student Number
  studentNo;

  selected:string = ""


  //variable to store the selected radio button
  book = 'book';
  cancel = 'cancel';
  //On initialize function
  ngOnInit(): void {
    this.getlab();
    this.tittle = localStorage.getItem("token")
    this.getStudents();
   this.selected
  }


  //get function that receive the results from the database
  getlab(){
    this.http.get<any>('http://localhost:3000/availableLabs').subscribe(
      response => {
       
        
        this.lab = response;
     
        console.log(response);
      }
    );
  }



  //get the student number from the database
  getStudents(){

    this.student = JSON.parse(this.tittle);
    this.studentNo = this.student[0].stud_no;
    console.log(this.studentNo);
  }


  //onclick function that cancel booking
  onClickCancel(data){
    //sweet Alerts pop up messages
    Swal.fire({
      title: 'Cancel this booking?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'YES',
      cancelButtonText: 'NO'
    }).then((result) => {
      if (result.isConfirmed) {
        // TODO: Use EventEmitter with form value
        //console.warn(this.ngForm.value);
        

        //Add the User to the Database
        this.http.post('http://localhost:3000/cancelBooking',data, {responseType:'text'})
        .subscribe((result)=>{
            console.warn("result",result)
            //On submit validation
            if(result == 'booking has been cancelled')
            {
              Swal.fire(
                result,
                '',
                'success'
              )
              //Navigate to the Login page
              
            }else{
              Swal.fire(
                result,
                '',
                'warning'
              )
            }

            
        })
        console.warn(data);
        
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Could Not cancel booking',
          'error'
        )
      }
    })
  }
 
  //On submit button
  onSubmit(data)
  {
    if(this.book == 'book'){
        //sweet Alerts pop up messages
    Swal.fire({
      title: 'Book A Lab?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'YES',
      cancelButtonText: 'NO'
    }).then((result) => {
      if (result.isConfirmed) {
        // TODO: Use EventEmitter with form value
        //console.warn(this.ngForm.value);
        

        //Add the User to the Database
        this.http.post('http://localhost:3000/book',data, {responseType:'text'})
        .subscribe((result)=>{
            console.warn("result",result)
            //On submit validation
            if(result == 'you have successfully booked for a lab')
            {
              Swal.fire(
                result,
                '',
                'success'
              )
              //Navigate to the Login page
              
            }else{
              Swal.fire(
                result,
                '',
                'warning'
              )
            }

            
        })
        console.warn(data);
        
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Could Not Add The User!',
          'error'
        )
      }
    })

    }
    
  if(this.cancel == 'cancel'){
       //sweet Alerts pop up messages
    Swal.fire({
      title: 'Cancel this booking?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'YES',
      cancelButtonText: 'NO'
    }).then((result) => {
      if (result.isConfirmed) {
        // TODO: Use EventEmitter with form value
        //console.warn(this.ngForm.value);
        

        //Add the User to the Database
        this.http.post('http://localhost:3000/cancelBooking',data, {responseType:'text'})
        .subscribe((result)=>{
            console.warn("result",result)
            //On submit validation
            if(result == 'booking has been cancelled')
            {
              Swal.fire(
                result,
                '',
                'success'
              )
              //Navigate to the Login page
              
            }else{
              Swal.fire(
                result,
                '',
                'warning'
              )
            }

            
        })
        console.warn(data);
        
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Could Not cancel booking',
          'error'
        )
      }
    })
  }
   

  }


  refresh(): void {
    window.location.reload();
  }

  //On click function for logout
  onClick()
  {
    
    localStorage.removeItem("token");
    this.router.navigate(['/index']);
  }

}