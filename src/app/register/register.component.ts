import { Component } from '@angular/core';
//import { FormGroup, FormControl, FormBuilder,Validators } from '@angular/forms';
//import { IssueService } from '../issue.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private http:HttpClient, private router: Router) { }

  

  onSubmit(data)
   {
    

    //sweet Alerts pop up messages
    Swal.fire({
      title: 'Register New User?',
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
        this.http.post('http://localhost:3000/registration',data, {responseType:'text'})
        .subscribe((result)=>{
            console.warn("result",result)
            //On submit validation
            if(result == 'user registered sucessfully')
            {
              Swal.fire(
                'Registered!',
                'User Added!',
                'success'
              )
              //Navigate to the Login page
              this.router.navigate(['/login']);
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

}
