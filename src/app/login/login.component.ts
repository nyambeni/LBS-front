import { Component, OnInit, Input } from '@angular/core';
//import { FormGroup, FormControl, FormBuilder,Validators } from '@angular/forms';
//import { IssueService } from '../issue.service';
import { Router, NavigationExtras} from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import Swal from 'sweetalert2';


//storing info receiced from the console
export class Details {
  constructor(
    public student_No: string,
    public student_Name: string,
    public student_Surname: string,
    public message,
  ) {
    message = student_Name+" "+student_Surname;
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  
})
export class LoginComponent implements OnInit {

  @Input() data:string;

  constructor(private http:HttpClient,private router: Router) { }
//student detail array
  student: Details[];



  ngOnInit(): void {
    this.getDetails();
  }
  
  //get function that receive the results from the database
  getDetails(){
    this.http.get<any>('http://localhost:3000/login').subscribe(
      response => {
        //console.log(response);
        
        this.student = response;
        //const {Lab_Name, Lab_Slot} = response;
        console.log(response);
      }
    );
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
            if(result.length > 0)
            {
              Swal.fire(
                'Successfully Logged In!',
                '',
                'success'
              )
              //Navigate to the Home page
              //this.router.navigate(['/home']);
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
