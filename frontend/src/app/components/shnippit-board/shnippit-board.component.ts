import {Component, ElementRef, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {
    faCheck,
    faClipboard,
    faCode,
    faEdit,
    faExclamationTriangle,
    faSave,
    faShareAlt,
    faTimes,
    faPlus,
    faEllipsisH,
    faPaperclip,
    faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import {BackendService} from "../../services/backend.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Shnippit} from "../../model/Shnippit.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Attachment} from "../../model/Attachment.model";
import {Observable} from "rxjs";

@Component({
    selector: 'shnippit-board',
    templateUrl: './shnippit-board.component.html',
    styleUrls: ['./shnippit-board.component.scss']
})
export class ShnippitBoardComponent implements OnInit {

    saveIcon = faSave;
    closeIcon = faTimes;
    cancelIcon = faTimes;
    typeIcon = faCode;
    editIcon = faEdit;
    errorIcon = faExclamationTriangle;
    successIcon = faCheck;
    shareIcon = faShareAlt;
    copyToClipBoardIcon = faClipboard;
    newIcon = faPlus;
    moreIcon = faEllipsisH;
    attachmentsIcon = faPaperclip;
    deleteIcon = faTrashAlt;

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
    attachments: Attachment[] = [];
    hasAttachments() {
        return this.attachments && this.attachments.length;
    }

    fileUploaderConfig() {
        return {
            multiple: true,
            fileNameIndex: false,
            uploadAPI:  {
                url: `/api/v1/shnippits/${this.shnippit?.publicId}/attachments`,
                method:"POST",
            },
            theme: "dragNDrop",
            hideProgressBar: false,
            hideResetBtn: true,
            hideSelectBtn: false,
            replaceTexts: {
                selectFileBtn: 'Select Files',
                resetBtn: 'Reset',
                uploadBtn: 'Upload',
                dragNDropBox: 'Drag N Drop',
                attachPinBtn: 'Attach Files...',
                afterUploadMsg_success: 'Successfully Uploaded !',
                afterUploadMsg_error: 'Upload Failed !',
                sizeLimit: 'Size Limit'
            }
        }
    };

    constructor(private backendService: BackendService,
                private router: Router,
                private route: ActivatedRoute,
                private modalService: NgbModal) {
    }

    @Input()
    editable: boolean = false;

    @Input()
    set shnippitId(shnippitId: string) {
        this.load(shnippitId);
    }

    @Input()
    set initialText(text: string) {
        if (text) {
            this.shnippit.text = text;
            this.hasChanged = true;
        }
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

    closeDisplayMoreOptions() {
        this.displayMoreOptions = false;
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
            this.error = {
                message: 'Could not fetch Shnippit',
                additionalMessage: `${error.statusText} (${error.status})`
            }
        });
        this.loadAttachments(publicId);
    }

    onUploadSuccess(event) {
        if (this.shnippit && this.shnippit.publicId) {
            this.loadAttachments(this.shnippit.publicId)
        } else {
            this.modalService.dismissAll()
            this.shnippit.publicId = event.body.publicId
            this.backendService.updateShnippit(this.shnippit).subscribe(shnippit => {
                this.router.navigate([shnippit.publicId])
            })
        }
    }

    loadAttachments(publicId: string) {
        this.backendService.getShnippitAttachments(publicId).subscribe(attachments => this.attachments = attachments, (error) => {
            console.info('Could not load attachments', error)
        })
    }

    openDialog(templateRef: TemplateRef<any>) {
        this.modalService.open(templateRef, { centered: true }).result.then((updateRequired) => {
            // Close
            if (updateRequired && this.shnippit.publicId) {
                this.update();
            }
        }, (dismissReasons) => {
            // Nothing to do on dismiss
        });
    }

    copyToClipBoard(){
        if (!this.editable) {
            this.copyFromDisplay();
        } else {
            this.copyFromTextarea();
        }
        this.successMessage = 'Copied to clipboard';
        setTimeout( () => {
            this.successMessage = '';
        }, 3000);
    }

    private copyFromDisplay() {
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
    }

    private copyFromTextarea() {
        const selBox = this._textArea.nativeElement;
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        selBox.blur();
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

    canShare(): boolean {
        return !!navigator['share']
    }

    share(): void {
        if (!this.canShare()) {
            this.error = {
                message: 'This client cannot share content',
                additionalMessage: `(Share API not supported)`
            };
            return;
        }
        navigator['share']({
            url: location.href,
            // title: document.title
        })
    }

    attachmentLink(shnippit: Shnippit, attachment: Attachment) {
        return `/api/v1/shnippits/${shnippit.publicId}/attachments/${attachment.name}`
    }

    deleteAttachment(shnippit: Shnippit, attachment: Attachment) {
        this.backendService.deleteAttachment(shnippit.publicId, attachment.name).subscribe(() => {
            this.load(shnippit.publicId)
        })
    }

}

class Error {
    message: string;
    additionalMessage: string = 'Unkown Error'
}
