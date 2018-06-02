import { Component, OnInit } from '@angular/core';
import { Menu } from 'electron';
 enum ViewState {
  List=0,
  AddStaff,
  UpdateStaff
  }

@Component({
  selector: 'app-staff-list-page',
  templateUrl: './staff-list-page.component.html',
  styleUrls: ['./staff-list-page.component.css']
})

export class StaffListPageComponent implements OnInit {
  ViewState=ViewState;
  state=ViewState.List
  constructor() {

  }

  ngOnInit() {
  }

}
