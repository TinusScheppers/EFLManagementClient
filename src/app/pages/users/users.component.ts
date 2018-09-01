import { Component, OnInit } from '@angular/core';

import { UserService, User } from '../../core/services/api.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[];
  columnsToDisplay = ['userName'];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getAll().subscribe(users => this.users = users)
  }

}
