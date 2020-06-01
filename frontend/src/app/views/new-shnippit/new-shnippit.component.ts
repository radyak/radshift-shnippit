import {Component, OnInit, Input} from '@angular/core';
import {faSave, faCog} from '@fortawesome/free-solid-svg-icons'
import {BackendService} from "../../services/backend.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-new-shnippit',
    templateUrl: './new-shnippit.component.html',
    styleUrls: ['./new-shnippit.component.scss']
})
export class NewShnippitComponent implements OnInit {
    saveIcon = faSave;
    optionsIcon = faCog;
    text: string = '';

    constructor(private backendService: BackendService, private router: Router) {
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
            this.router.navigate([shnippit.publicId]);
        })
    }
}
