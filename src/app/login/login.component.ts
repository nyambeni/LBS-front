import { Component, OnInit, Input } from '@angular/core';
//import { FormGroup, FormControl, FormBuilder,Validators } from '@angular/forms';
//import { IssueService } from '../issue.service';
import { Router, NavigationExtras} from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import Swal from 'sweetalert2';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  
})
export class LoginComponent implements OnInit {

  

  constructor(private http:HttpClient,private router: Router) { }
  @Input()
  //variable to store the selected radio button
  answer = '';

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
        //Check if Selected Radio button is for student
        if(this.answer == "Student")
        {
          console.log(this.answer);
          //Retrieve Information from the database
          this.http.post('http://localhost:3000/login',data, {responseType: 'text'})
          .subscribe((result)=>{
          console.warn("result",result)
          if(result == "incorrect username or password" || result == "Please enter values")
            {
              Swal.fire(
                result,
                '',
                'warning'
              )
            }else{

              //store the results using a token
              localStorage.setItem("token", result)

              Swal.fire(
                'Successfully Logged In!',
                '',
                'success'
              )
              //Navigate to the Home page
              this.router.navigate(['/home']);
            }
            
          })
          console.warn(data);
        }
        //Check if Selected Radio button is for Lecturer
        if(this.answer == "Lecturer")
        {
          console.log(this.answer);
          //Retrieve Information from the database
          this.http.post('http://localhost:3000/lec_login',data, {responseType: 'text'})
          .subscribe((result)=>{
          console.warn("result",result)
          if(result == "incorrect username or password" || result == "Please enter values")
          {
            Swal.fire(
              result,
              '',
              'warning'
            )
            
            }else{

              //store the results using a token
            localStorage.setItem("token", result)

            Swal.fire(
              'Successfully Logged In!',
              '',
              'success'
            )
            //Navigate to the Home page
            
            this.router.navigate(['/home']);

             
            }
            
          })
          console.warn(data);
        }  
        //Check if Selected Radio button is for Admin
        if(this.answer == "Admin")
        {
          console.log(this.answer);

          //Retrieve fronm database
          this.http.post('http://localhost:3000/adminLogin',data, {responseType: 'text'})
          .subscribe((result)=>
          {
            console.warn("result",result)
            if(result == "incorrect username or password" || result == "Please enter values")
            {
              Swal.fire
              (result,
                '',
                'warning'
              )
              //Navigate to the Admin  page
              
              
            } else {
              localStorage.setItem("token", result)

            Swal.fire(
              'Successfully Logged In!',
              '',
              'success'
            )

              this.router.navigate(['/admin']);

            }
          })
          console.warn(data);

        }

        //check if the radio button is clicked
        if(this.answer == "")
        {
          Swal.fire(
            'Please select Radio Button',
            '',
            'error'
          )
        }
      
      } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled!!',
            '',
            'error'
          )
        }
    })
  
  }


}
