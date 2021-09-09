import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

export class Students {
  constructor(
    public stud_no: string,
    public stu_name: string,
    public stud_surname: string,
    public email: string,
  ){}
}

export class Lecturers {
  constructor(
    public lec_id: string,
    public lec_name: string,
    public lec_email: string,
  ){}
}

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  constructor(private http:HttpClient, private router: Router) { }
  //student array to store data from database
  student:Students[];

  lecturer:Lecturers[];

  ngOnInit(): void {
    
    this.getStudents();
    this.getLecturer();
    
  }
  onClick()
  {
    
    localStorage.removeItem("token");
    this.router.navigate(['/index']);
  }
  onDelete(){
    
    this.http.delete('http://localhost:3000/DeleteStudent')
    .subscribe(results => {
      this.ngOnInit();
     console.log(results);
      

    })
  }
  getStudents(){
    this.http.get<any>('http://localhost:3000/studentsList')
    .subscribe(response => {

      this.student = response;
      console.log(response);
    })
  }
  getLecturer(){
    this.http.get<any>('http://localhost:3000/LecturersList')
    .subscribe(response => {
      this.lecturer = response;
      console.log(response);
    })
  }
  

}
