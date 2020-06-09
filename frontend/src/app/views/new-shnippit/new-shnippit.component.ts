import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-new-shnippit',
    templateUrl: './new-shnippit.component.html',
    styleUrls: ['./new-shnippit.component.scss']
})
export class NewShnippitComponent implements OnInit {

    initialText: string;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            this.initialText = [
                    params['title'],
                    params['text'],
                    params['url'],
                    params['name'],
                    params['description'],
                    params['link']
                ]
                .filter(element => !!element)
                .join('\n');
        });

    }
}
