import {Component, Input, OnInit} from '@angular/core';
import {faCog, faSave} from "@fortawesome/free-solid-svg-icons";
import {BackendService} from "../../services/backend.service";
import {Router} from "@angular/router";
import {Shnippit} from "../../model/Shnippit.model";

@Component({
    selector: 'shnippit-board',
    templateUrl: './shnippit-board.component.html',
    styleUrls: ['./shnippit-board.component.scss']
})
export class ShnippitBoardComponent implements OnInit {

    saveIcon = faSave;
    optionsIcon = faCog;

    @Input()
    shnippit: Shnippit;

    constructor(private backendService: BackendService, private router: Router) {
    }

    ngOnInit(): void {
    }

    @Input()
    onChangeText(value) {
        this.shnippit.text = value;
    }

    save() {
        if (this.shnippit.publicId) {
            this.update();
        } else {
            this.create();
        }
    }

    private create() {
        this.backendService.createShnippit(this.shnippit).subscribe(shnippit => {
            this.router.navigate([shnippit.publicId]);
        })
    }

    private update() {
        this.backendService.updateShnippit(this.shnippit).subscribe(updatedShnippit => {
            this.shnippit = updatedShnippit;
        })
    }

}
