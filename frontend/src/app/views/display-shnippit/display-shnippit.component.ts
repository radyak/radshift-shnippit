import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Shnippit} from "../../model/Shnippit.model";
import {Observable, pipe} from "rxjs";
import {BackendService} from "../../services/backend.service";
import {switchMap} from "rxjs/operators";

@Component({
    selector: 'app-display-shnippit',
    templateUrl: './display-shnippit.component.html',
    styleUrls: ['./display-shnippit.component.scss']
})
export class DisplayShnippitComponent implements OnInit {

    shnippit$: Observable<Shnippit>;

    constructor(private route: ActivatedRoute, private backendService: BackendService) {
    }

    ngOnInit(): void {
        this.shnippit$ = this.route.paramMap.pipe(
            switchMap(params => {
                let publicId = params.get('publicId');
                return this.backendService.getShnippit(publicId);
            })
        );
    }

}
