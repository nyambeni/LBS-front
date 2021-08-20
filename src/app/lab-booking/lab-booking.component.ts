import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder,Validators } from '@angular/forms';
import { IssueService } from '../issue.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import Swal from 'sweetalert2';
import { GroupedObservable } from 'rxjs';
import { __values } from 'tslib';


export class Labs {
  constructor(
    public Lab_Name: string,
    public Lab_Slot: string,
  ) {
  }
}

@Component({
  selector: 'app-lab-booking',
  templateUrl: './lab-booking.component.html',
  styleUrls: ['./lab-booking.component.css']
})
export class LabBookingComponent implements OnInit {
  
  constructor(private http:HttpClient, private router: Router, private fb:FormBuilder) { }
  lab: Labs[];
 
  ngOnInit(): void {
    this.getlab();
  }


  //get function that receive the results from the database
  getlab(){
    this.http.get<any>('http://localhost:3000/availableLabs').subscribe(
      response => {
        //console.log(response);
        
        this.lab = response;
        //const data = response.json();
        const {Lab_Name, Lab_Slot} = response;
        console.log(response);
        //document.getElementById('name').textContent = Lab_Name;
       // document.getElementById('slot').textContent = Lab_Slot;
      }
    );
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
        this.http.post('http://localhost:3000/availableLabs',data, {responseType: 'text'})
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
