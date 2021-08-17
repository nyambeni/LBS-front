import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lab-booking',
  templateUrl: './lab-booking.component.html',
  styleUrls: ['./lab-booking.component.css']
})
export class LabBookingComponent implements OnInit {

  constructor(private http:HttpClient,private router: Router) { }

  ngOnInit(): void {
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
