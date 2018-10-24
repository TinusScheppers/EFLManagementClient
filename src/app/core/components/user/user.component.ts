import { Component, OnInit, Input } from '@angular/core';

import { UserService, User, Card, CardService } from '../../../core/services/api.service';
import { CardHubService } from '../../services/cardhub.service';


@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    user: User;
    cards: Card[];
    scannedCard: Card;
    canSendMessage: Boolean;
    cardCode: string;

    @Input()
    set userId(userId: number) {
        this.GetUserData(userId);
        this.cardCode = '';

    }

    constructor(private userService: UserService, private cardService: CardService, private hubService: CardHubService) {
        this.subscribeToEvents();
    }

    ngOnInit() {
    }

    delete(cardId: number) {
        this.cardService.deleteCard(cardId)
            .subscribe(() => {
                this.GetUserData(this.user.userId)
            });
    }

    add(scannedCardCode: string) {
        this.cardService.linkCard(this.user.userId, scannedCardCode)
            .subscribe(newCard => this.cards.push(newCard));
    }

    private GetUserData(userId: number) {
        this.userService.getById(userId).subscribe(user => {
            this.user = user;
        });
        this.cardService.getAllForUser(userId).subscribe(cards => {
            this.cards = cards;
        })
    }

    private subscribeToEvents(): void {
        // this.hubService.connectionEstablished.subscribe(() => {
        //     this.canSendMessage = true;
        // });

        this.hubService.newCardReceived.subscribe((cardCode) => {
            this.cardCode = cardCode;
        });
    }
}