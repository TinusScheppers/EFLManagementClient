import { Component, OnInit, Input } from '@angular/core';

import { UserService, User } from '../../core/services/api.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    user: User;
    isAdmin: boolean;

    @Input()
    set userId(userId: number) {
        this.userService.getById(userId).subscribe(user => {
            this.user = user;
            this.isAdmin = user.isAdmin;
        });
    }

    constructor(private userService: UserService) { }

    ngOnInit() {
    }
}