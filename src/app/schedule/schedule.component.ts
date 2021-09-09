import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import Swal from 'sweetalert2';

//labs class
export class Labs {
  constructor(
    public Lab120: string = "Lab 120",
    public Lab130: string = "Lab 130",
    public Lab140: string = "Lab 140",
    public Lab150: string = "Lab 150",
   
  ) {
  }
}
//slots class
export class Slots{
  constructor(
    public slotA: string,
    public slotB: string,
    public slotC: string,
    public slotD: string,
  ){

  }
}

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  date = new Date();
  dateStringControl = new FormControl('2020-09-28');
  dateObjectControl = new FormControl(new Date());

  updateDate(event: any) {
    this.date = event.target.valueAsDate;
  }

  //variable to handle the radio button
  answer: string;
  //variable that holds the selected lab
  selectedLab:string = ""
  //variable that holds the selected slot
  selectedSlot: string = ""

  constructor(private http:HttpClient, private router: Router) { }
  //lab array that store the labs
  lab: Labs[];
  //array that store the slots
  slot: Slots[];
  ngOnInit(): void {
  }

  //on submit function
  onSubmit(data){
        //sweet Alerts pop up messages
        Swal.fire({
          title: 'Confirm Schedule?',
          text: '',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'YES',
          cancelButtonText: 'NO'
        }).then((result) => {
          if (result.isConfirmed) {
            // TODO: Use EventEmitter with form value
            //console.warn(this.ngForm.value);
            
            if(this.answer == 'student')
            {
                  //Add the User to the Database
                this.http.post('http://localhost:3000/lab_Schedule',data, {responseType:'text'})
                .subscribe((result)=>{
                console.warn("result",result)
                //On submit validation
                if(result == 'lab is now available for booking on this date')
                {
                  Swal.fire(
                    result,
                    '',
                    'success'
                  )
                  //Navigate to the Login page
                  this.router.navigate(['/']);
                }else{
                  Swal.fire(
                    result,
                    '',
                    'warning'
                  )
                }

                
              })
              console.warn(data);
            }
            if(this.answer == 'lecturer')
            {
                  //Add the User to the Database
                  this.http.post('http://localhost:3000/lab_Schedule',data, {responseType:'text'})
                  .subscribe((result)=>{
                  console.warn("result",result)
                  //On submit validation
                  if(result == 'lab is now available for booking on this date')
                  {
                    Swal.fire(
                      result,
                      '',
                      'success'
                    )
                    //Navigate to the Login page
                    this.router.navigate(['/']);
                  }else{
                    Swal.fire(
                      result,
                      '',
                      'warning'
                    )
                  }
      
                  
                })
                console.warn(data);
            }
            
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
              'Cancelled',
              'Could Not Publish the schedule!',
              'error'
            )
          }
        })
      }
      onClick()
      {
        
        localStorage.removeItem("token");
        this.router.navigate(['/index']);
      }

}
