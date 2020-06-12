import {Component, OnInit} from '@angular/core';
import {LocalCacheService} from "../../services/local-cache.service";
import {Shnippit} from "../../model/Shnippit.model";
import {faCode, faExclamationTriangle, faSearch} from "@fortawesome/free-solid-svg-icons";
import {BackendService} from "../../services/backend.service";
import {Router} from "@angular/router";

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
    searchIcon = faSearch;
    errorIcon = faExclamationTriangle;

    constructor(private localCacheService: LocalCacheService,
                private backendService: BackendService,
                private router: Router) {
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

}
