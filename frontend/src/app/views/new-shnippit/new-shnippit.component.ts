import {Component, OnInit, Input} from '@angular/core';
import {faSave, faTimes} from '@fortawesome/free-solid-svg-icons'
import {BackendService} from "../../services/backend.service";

@Component({
    selector: 'app-new-shnippit',
    templateUrl: './new-shnippit.component.html',
    styleUrls: ['./new-shnippit.component.scss']
})
export class NewShnippitComponent implements OnInit {
    saveIcon = faSave;
    closeIcon = faTimes;
    text: string = 'test';

    constructor(private backendService: BackendService) {
    }

    ngOnInit(): void {
    }

    @Input()
    onChangeText(value) {
        this.text = value;
    }

    save() {
        this.backendService.createShnippit({
            text: this.text
        }).subscribe(shnippit => {
            console.log('yay', shnippit);
        })
    }
}
