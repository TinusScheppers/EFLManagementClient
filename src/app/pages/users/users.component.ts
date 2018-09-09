import { Component, OnInit } from '@angular/core';

import { User } from '../../core/services/api.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  selectedUserId: Number;
  
  constructor() { }

  ngOnInit() {
  }

  receiveUser($event){
    this.selectedUserId = $event;
  }
}
