import {Component, Input, OnInit} from '@angular/core';
import {faCog, faSave, faEdit} from "@fortawesome/free-solid-svg-icons";
import {BackendService} from "../../services/backend.service";
import {Router} from "@angular/router";
import {Shnippit} from "../../model/Shnippit.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'shnippit-board',
    templateUrl: './shnippit-board.component.html',
    styleUrls: ['./shnippit-board.component.scss']
})
export class ShnippitBoardComponent implements OnInit {

    saveIcon = faSave;
    optionsIcon = faCog;
    editIcon = faEdit;

    @Input()
    shnippit: Shnippit;

    @Input()
    editable: boolean = false;

    constructor(private backendService: BackendService,
                private router: Router,
                private modalService: NgbModal) {
    }

    ngOnInit(): void {
    }

    @Input()
    setText(text: string) {
        this.shnippit.text = text;
    }

    setType(type: string) {
        this.shnippit.type = type;
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
            this.editable = false;
            this.shnippit = updatedShnippit;
        })
    }

    openOptions(content) {
        this.modalService.open(content, { centered: true });
    }

    toggleEdit() {
        this.editable = !this.editable;
    }

}
