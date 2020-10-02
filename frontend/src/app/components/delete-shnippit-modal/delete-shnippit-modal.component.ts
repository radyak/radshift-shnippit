import {Component, Input, OnInit} from '@angular/core';
import {faExclamationTriangle, faTimes, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Shnippit} from "../../model/Shnippit.model";
import {LocalCacheService} from "../../services/local-cache.service";
import {BackendService} from "../../services/backend.service";

@Component({
  selector: 'app-delete-shnippit-modal',
  templateUrl: './delete-shnippit-modal.component.html',
  styleUrls: ['./delete-shnippit-modal.component.scss']
})
export class DeleteShnippitModalComponent implements OnInit {

    deleteIcon = faTrashAlt;
    closeIcon = faTimes;
    errorIcon = faExclamationTriangle;

    @Input() shnippit: Shnippit;

    constructor(public activeModal: NgbActiveModal,
                private localCacheService: LocalCacheService,
                private backendService: BackendService) {}

    ngOnInit(): void {
    }

    deleteShnippitLocally() {
        this.localCacheService.deleteShnippitByPublicId(this.shnippit.publicId).subscribe(
            () => this.activeModal.close(),
            () => console.error('Could not delete shnippit locally')
        )
    }

    deleteShnippitFromServer() {
        this.backendService.deleteShnippit(this.shnippit.publicId).subscribe(
            () => this.activeModal.close(),
            () => {
                console.error('Could not delete shnippit from server');
                this.deleteShnippitLocally()
            }
        );
    }

}
