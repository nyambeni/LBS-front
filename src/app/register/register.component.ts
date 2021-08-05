import { Component } from '@angular/core';
//import { FormGroup, FormControl, FormBuilder,Validators } from '@angular/forms';
//import { IssueService } from '../issue.service';
//import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private http:HttpClient) { }

  

  onSubmit(data)
   {
    // TODO: Use EventEmitter with form value
    //console.warn(this.registerForm.value);
    //this.router.navigate(['/login']);
    this.http.post('http://localhost:3000/registration',data)
    .subscribe((result)=>{
      console.warn("result",result)
    })
    console.warn(data);
  }

}
