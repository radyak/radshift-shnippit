import {Component, Input, OnInit} from '@angular/core';
import {Shnippit} from "../../model/Shnippit.model";

@Component({
    selector: 'app-new-shnippit',
    templateUrl: './new-shnippit.component.html',
    styleUrls: ['./new-shnippit.component.scss']
})
export class NewShnippitComponent implements OnInit {

    shnippit: Shnippit;

    constructor() {
    }

    ngOnInit(): void {
        this.shnippit = {
            text: '',
            type: 'RAW'
        };
    }
}
