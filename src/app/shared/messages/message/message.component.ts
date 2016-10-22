import {Component, OnInit, Input, ChangeDetectionStrategy} from '@angular/core';
import {Message} from "../../model/message";

@Component({
    selector: 'jo-tut-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent implements OnInit {

    @Input() private message: Message;

    constructor() {
    }

    ngOnInit() {
    }

}
