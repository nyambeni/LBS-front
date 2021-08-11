import { Component, OnInit } from '@angular/core';
//import { FormGroup, FormControl, FormBuilder,Validators } from '@angular/forms';
//import { IssueService } from '../issue.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private router: Router, private http:HttpClient) { }

  ngOnInit(): void {
  }
  onSubmit(data) {
    // TODO: Use EventEmitter with form value
    //console.warn(this.resetpassForm.value);
    

    //sweet Alerts pop up messages
    Swal.fire({
      title: 'Send the Password to this Email?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'YES',
      cancelButtonText: 'NO'
    }).then((result) => {
      if (result.isConfirmed) {

        //Add the User to the Database
        this.http.post('http://localhost:3000/forgotPassword',data,{responseType: 'text'})
        .subscribe((result)=>{
            console.warn("result",result)
            if(result == 'student number does not exist')
            {
              Swal.fire(
                'Done!',
                result,
                'warning'
              )
            }else{
              
              Swal.fire(
                'Done!',
                'Your password is '+result,
                'success'
              )
              //Navigate to the Login page
              this.router.navigate(['/login']);
            }
            
        })
        console.warn(data);

        
        
      
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled!',
          '',
          'error'
        )
      }
    })
  }

}
