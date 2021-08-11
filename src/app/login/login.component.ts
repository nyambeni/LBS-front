import { Component, OnInit } from '@angular/core';
//import { FormGroup, FormControl, FormBuilder,Validators } from '@angular/forms';
//import { IssueService } from '../issue.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http:HttpClient,private router: Router) { }

  ngOnInit(): void {
  }
  
  onSubmit(data) {
    // TODO: Use EventEmitter with form value
    //console.warn(this.loginForm.value);

     //sweet Alerts pop up messages
     Swal.fire({
      title: 'Login Details',
      text: 'Save Your Password?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'YES',
      cancelButtonText: 'NO'
    }).then((result) => {
      if (result.isConfirmed) {

        //Retrieve Information from the database
        this.http.post('http://localhost:3000/login',data, {responseType: 'text'})
        .subscribe((result)=>{
            console.warn("result",result)
            if(result == 'you have sucessfully loged in')
            {
              Swal.fire(
                'Logged In',
                '',
                'success'
              )
              //Navigate to the Home page
              this.router.navigate(['']);
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
          'incorrect Login name or Password',
          '',
          'error'
        )
      }
    })
  
  }

}
