import { Component, OnInit, Input } from '@angular/core';

import { UserService, User, Card, CardService } from '../../core/services/api.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    user: User;
    cards: Card[];
    scannedCard: Card;

    @Input()
    set userId(userId: number) {
        this.userService.getById(userId).subscribe(user => {
            this.user = user;            
        });
        this.cardService.getAllForUser(userId).subscribe(cards => {
            //this.cards = cards;
        })
    }

    constructor(private userService: UserService, private cardService: CardService) { }

    ngOnInit() {
    }

    delete(cardId: number) {
        
    }

    add(scannedCardCode: string) {
        this.cardService.linkCard(this.userId, scannedCardCode)
            .subscribe(newCard => this.cards.push(newCard));
    }
}