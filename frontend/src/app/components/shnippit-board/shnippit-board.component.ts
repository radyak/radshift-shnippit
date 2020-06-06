import {Component, Input, OnInit} from '@angular/core';
import {faCog, faSave, faEdit, faTimes} from "@fortawesome/free-solid-svg-icons";
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
    closeIcon = faTimes;
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

    cancel() {
        this.backendService.getShnippit(this.shnippit.publicId).subscribe(shnippit => {
            this.editable = false;
            this.shnippit = shnippit;
        })
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
        this.modalService.open(content, { centered: true }).result.then((closeResult) => {
            // Close
            if (closeResult && this.shnippit.publicId) {
                this.update();
            }
        }, (dismissReasons) => {
            // Nothing to do on dismiss
        });
    }

    toggleEdit() {
        this.editable = !this.editable;
    }

    handleKeyDown(event) {
        this.handleTab(event)
        this.handleCtrlS(event)
        this.handleEscape(event)
    }

    private handleCtrlS(event) {
        if(navigator.platform.match('Mac')){
            this.handleMacKeyEvents(event);
        }
        else {
            this.handleWindowsKeyEvents(event);
        }
    }

    private handleTab(event) {
        if (event.keyCode === 9 || event.which === 9) {
            event.preventDefault();
            var start = event.target.selectionStart;
            var end = event.target.selectionEnd;
            this.shnippit.text = this.shnippit.text.substring(0, start) + '\t' + this.shnippit.text.substring(end);
            event.target.selectionStart = event.target.selectionEnd = start + 1;
        }

    }

    private handleMacKeyEvents(event) {
        // MetaKey documentation
        // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/metaKey
        let charCode = String.fromCharCode(event.which).toLowerCase();
        if (event.metaKey && charCode === 's') {
            // Action on Cmd + S
            event.preventDefault();
            this.save();
        }
    }

    private handleEscape(event) {
        if (event.which === 27 || event.keyCode === 27) {
            this.cancel();
        }
    }

    private handleWindowsKeyEvents(event) {
        let charCode = String.fromCharCode(event.which).toLowerCase();
        if (event.ctrlKey && charCode === 's') {
            // Action on Ctrl + S
            event.preventDefault();
            this.save();
        }
    }

}
