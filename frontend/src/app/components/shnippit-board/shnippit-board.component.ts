import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {
    faCheck,
    faClipboard,
    faCog,
    faEdit,
    faExclamationTriangle,
    faSave,
    faShareAlt,
    faTimes,
    faPlus,
    faEllipsisH
} from "@fortawesome/free-solid-svg-icons";
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
    cancelIcon = faTimes;
    optionsIcon = faCog;
    editIcon = faEdit;
    errorIcon = faExclamationTriangle;
    successIcon = faCheck;
    shareIcon = faShareAlt;
    copyToClipBoardIcon = faClipboard;
    newIcon = faPlus;
    moreIcon = faEllipsisH;

    hasChanged: boolean = false;

    error: Error;
    successMessage: string;

    displayMoreOptions: boolean = false;

    private _textArea: ElementRef;
    @ViewChild("textArea", { static: false }) set textArea(textArea: ElementRef) {
        if(textArea) {
            this._textArea = textArea;
        }
    }

    shnippit: Shnippit = {
        text: '',
        type: 'RAW'
    };

    constructor(private backendService: BackendService,
                private router: Router,
                private modalService: NgbModal) {
    }

    @Input()
    editable: boolean = false;

    @Input()
    set shnippitId(shnippitId: string) {
        this.load(shnippitId);
    }

    ngOnInit(): void {
    }

    setText(text: string) {
        this.shnippit.text = text;
        this.hasChanged = true;
    }

    setType(type: string) {
        this.shnippit.type = type;
        this.hasChanged = true;
    }

    setShnippit(shnippit: Shnippit) {
        this.editable = false;
        this.hasChanged = false;
        this.shnippit = shnippit;
    }

    toggleEdit() {
        this.editable = !this.editable;
        if (this.editable) {
            setTimeout(()=>{ // this will make the execution after the above boolean has changed
                this._textArea.nativeElement.focus();
            },0);
        }
    }

    toggleDisplayMoreOptions() {
        this.displayMoreOptions = !this.displayMoreOptions;
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
        }, (error) => {
            this.error = {
                message: 'Could not create Shnippit',
                additionalMessage: `${error.statusText} (${error.status})`
            }
        })
    }

    private update() {
        this.backendService.updateShnippit(this.shnippit).subscribe(shnippit => this.setShnippit(shnippit), (error) => {
            this.error = {
                message: 'Could not update Shnippit',
                additionalMessage: `${error.statusText} (${error.status})`
            }
        })
    }

    cancel() {
        if (this.shnippit.publicId) {
            this.load(this.shnippit.publicId);
        } else {
            this.shnippit.text = '';
        }
        this.error = null;
    }

    new() {
        this.router.navigate(["/"]);
    }

    private load(publicId: string) {
        this.backendService.getShnippit(publicId).subscribe(shnippit => this.setShnippit(shnippit), (error) => {
            console.log('Err', error)
            this.error = {
                message: 'Could not fetch Shnippit',
                additionalMessage: `${error.statusText} (${error.status})`
            }
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

    copyToClipBoard(){
        const selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = this.shnippit.text;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
        this.successMessage = 'Copied to clipboard';
        setTimeout( () => {
            this.successMessage = '';
        }, 3000);
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

class Error {
    message: string;
    additionalMessage: string = 'Unkown Error'
}
