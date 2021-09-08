import { Component, OnInit } from '@angular/core';

import { Router, NavigationExtras} from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import Swal from 'sweetalert2';

//Retrieving student details from the database
export class Details{
  constructor(
    public stud_no: string,
    public stu_name: string,
    public stud_surname: string,
    public email: string,
  ){}
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  //student detail array
  student:Details[];

  //variable to store the title 
  tittle: string;
  //variable to store the student Number
 studentNo;
  constructor(private http:HttpClient,private router: Router){ }
  
   

  ngOnInit(): void {
    this.tittle = localStorage.getItem("token");
    this.getDetails();
    this.studentNo = this.student[0].stud_no;
    console.log(this.studentNo);
  }

 //get function that receive the results from the database
  getDetails(){
    this.student = JSON.parse(this.tittle);
  }
  onClick()
  {
    
    localStorage.removeItem("token");
    this.router.navigate(['/index']);
  }
 
  onSubmit(data){

      //sweet alerts pop up messages
      Swal.fire({
        title:'Change Password?',
        text:' ',
        icon:'warning',
        showCancelButton: true,
        confirmButtonText: 'YES',
        cancelButtonText:'NO'
      }).then((result) => {
        if(result.isConfirmed)
        {
          //Retrieve information from the database
          this.http.post('http://localhost:3000/updatePassword',data,{responseType:'text'})
          .subscribe((result) =>{

            if (result =="password successfully updated") {

              localStorage.setItem("token",result)

              Swal.fire(

                'Successully changed password',
                '',
                'success'

              )
              //Navigate to the profile page
              this.router.navigate(['/profile']);
            }else{

              Swal.fire(

                result,
                '',
                'warning'
              )
            }
          })
          console.warn(data);
        }else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'illegal change of Password',
            '',
            'error'
          )
        } 
    }) 
}
  
}