import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder,Validators } from '@angular/forms';
import { IssueService } from '../issue.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import Swal from 'sweetalert2';
import { GroupedObservable } from 'rxjs';
import { __values } from 'tslib';

@Component({
  selector: 'app-lab-booking',
  templateUrl: './lab-booking.component.html',
  styleUrls: ['./lab-booking.component.css']
})
export class LabBookingComponent implements OnInit {

  constructor(private http:HttpClient, private router: Router, private fb:FormBuilder) { }
  //group the form
  labBooking = new FormGroup({
    lab: new FormControl(''),
    name: new FormControl(''),
  });
  /*array for frop down list
  labs = [
    {id: 1, name: "Lab 10-120"},
    {id: 2, name: "Lab 10-138"},
    {id: 3, name: "Lab 10-132"},
    {id: 4, name: "Lab 10-128"}
  ];*/


  selectedLevel;
  data:Array<Object> = [
      {id: 0, name: "fds"},
      {id: 1, name: "sfd"}
  ];

  selected(){
    console.log(this.selectedLevel.name)
  }






  ngOnInit(): void {
    //
    this.labBooking = this.fb.group({
      labBooking: [null]
    });
  }

  onSubmit(data)
  {
    Swal.fire({
      title: 'Booking',
      text: 'Confirm Booking!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'YES',
      cancelButtonText: 'NO'
    }).then((result) => {
      if (result.isConfirmed) {

        //Retrieve Information from the database
        this.http.post('http://localhost:3000/lab-booking',data, {responseType: 'text'})
        .subscribe((result)=>{
            console.warn("result",result)
            if(result == '') //check backend message if successful
            {
              Swal.fire(
                'Done!',
                '',
                'success'
              )
              //Navigate to the Home page
              this.router.navigate(['/home']);
            }else{

              Swal.fire(
                result,
                '',
                'warning'
              )
            }
            
        })
        //show the results on the console
        console.warn(data);
      
        
      
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Booking Not Successful!',
          '',
          'error'
        )
      }
    })
  }
  onClickUpdate()
  {

  }
  onClickCancel()
  {

  }

}
