import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { IssueService } from '../issue.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private issueService: IssueService) { }
  registerForm = new FormGroup({
    txt_name: new FormControl(''),
    txt_surname: new FormControl(''),
    txt_email: new FormControl(''),
    txt_stuNumber: new FormControl(''),
    txt_password: new FormControl(''),
    txt_confirm: new FormControl(''),
  });

  ngOnInit(): void {
    this.issueService.getIssues().subscribe((issues) => {
      console.log(issues);
    });
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.registerForm.value);
  }

}
