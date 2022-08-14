import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


interface Slot {
  value: string;
  viewValue: string;

}

interface Labs {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  //number of seats per lab from backend
  seats: number = 20;
  //Will be from backend/admin
  labs: Labs[] = [
    { value: '10G20', viewValue: `10G20  Available seats ${this.seats}` },
    { value: '10G44', viewValue: '10G44', },
    { value: '18G20', viewValue: '18G20', },
    { value: '22G20', viewValue: '22G20', },
    { value: '10G88', viewValue: '10G88', },
    { value: '10-240', viewValue: '10-240', },
  ];

   //Will be from backend/admin
   slots: Slot[] = [
    {
      value: '1',
      viewValue: 'slot 1 8-9am'
    },
    {
      value: '2',
      viewValue: 'slot 2 9-10am'
    },
    {
      value: '3',
      viewValue: 'slot 3 10-11am'
    },
    {
      value: '4',
      viewValue: 'slot 4 11-12pm'
    },
    {
      value: '5',
      viewValue: 'slot 5 12-13pm'
    },
    {
      value: '6',
      viewValue: 'slot 6 13-14pm'
    },
    {
      value: '7',
      viewValue: 'slot 7 14-16pm'
    },
    {
      value: '8',
      viewValue: 'slot 8 16-17pm'
    },
    {
      value: '9',
      viewValue: 'slot 9 17-18pm'
    },
    {
      value: '10',
      viewValue: 'slot 10 18-19pm'
    },
    {
      value: '11',
      viewValue: 'slot 11 19-20pm'
    },
    {
      value: '12',
      viewValue: 'slot 12 20-21pm'
    },
    {
      value: '13',
      viewValue: 'slot 13 21-22pm'
    },
    {
      value: '14',
      viewValue: 'slot 14 22-23pm'
    },
    {
      value: '15',
      viewValue: 'slot 15 23-00pm'
    }
  ];

  selectedLab = 'apple';
  selectedSlot = 'apple';

  model : any = {};
  userId: any = {};

  emptyAppointment = false;
  successAppointment = false;

  totalTakenSeats: number = 0;
  constructor() { }

  ngOnInit(): void {
  }

}
