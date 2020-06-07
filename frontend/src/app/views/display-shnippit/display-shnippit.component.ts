import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-display-shnippit',
    templateUrl: './display-shnippit.component.html',
    styleUrls: ['./display-shnippit.component.scss']
})
export class DisplayShnippitComponent implements OnInit {

    shnippitId: string;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.shnippitId = params.get('publicId')
        })
    }

}
