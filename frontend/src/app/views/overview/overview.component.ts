import {Component, OnInit} from '@angular/core';
import {LocalCacheService} from "../../services/local-cache.service";
import {Shnippit} from "../../model/Shnippit.model";
import {faCode, faExclamationTriangle, faSearch, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {BackendService} from "../../services/backend.service";
import {Router} from "@angular/router";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DeleteShnippitModalComponent} from "../../components/delete-shnippit-modal/delete-shnippit-modal.component";

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

    shnippits: Shnippit[] = [];
    searchTerm: string;
    error: string;

    typeIcon = faCode;
    deleteIcon = faTrashAlt;
    searchIcon = faSearch;
    errorIcon = faExclamationTriangle;

    constructor(private localCacheService: LocalCacheService,
                private backendService: BackendService,
                private router: Router,
                private modalService: NgbModal) {
    }

    ngOnInit(): void {
        this.localCacheService.getAllShnippits().subscribe(shnippits => {
            this.shnippits = shnippits;
        })
    }

    search() {
        if (!this.searchTerm) {
            return;
        }
        this.backendService.getShnippit(this.searchTerm.trim()).subscribe(shnippit => {
            if (shnippit) {
                this.router.navigate([shnippit.publicId])
            } else {
                this.error = `Couldn't find any shnippit with ID '${this.searchTerm.trim()}'`
            }
        })
    }

    getFilteredShnippits(): Shnippit[] {
        let regExp = new RegExp(this.searchTerm || '', 'i');
        return this.shnippits.filter(shnippit =>
            regExp.test(shnippit.text)
        )
    }

    deleteShnippitFromView(shnippit: Shnippit) {
        let index = this.shnippits.indexOf(shnippit);
        this.shnippits.splice(index, 1);
    }

    openModal(shnippit: Shnippit) {
        const modalRef = this.modalService.open(DeleteShnippitModalComponent, {centered: true});
        modalRef.componentInstance.shnippit = shnippit;

        modalRef.result.then(() => {
            this.deleteShnippitFromView(shnippit);
        }, (reason => {

        }));
    }

}

