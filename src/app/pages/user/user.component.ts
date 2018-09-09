import { Component, OnInit, Input } from '@angular/core';

import { User } from '../../core/services/api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @Input() userId: Number;

  constructor() { }

  ngOnInit() {
  }
}