import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { UserTableDataSource } from './user-table-datasource';

import { UserService } from '../../services/api.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: UserTableDataSource;
  length: number;

  @Output() userClickEvent = new EventEmitter<Number>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['userId', 'name', 'surname'];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getAll().subscribe(users => {
      this.length = users.length;
      //getting data on connect() from datatable is not good place
      this.dataSource = new UserTableDataSource(this.paginator, this.sort, users);
    });
  }

  sendUser(userId: number) {
    this.userClickEvent.emit(userId);
  }
}
