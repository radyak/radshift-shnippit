import { Component, OnInit } from '@angular/core';
import { faPaperPlane, faTimes } from "@fortawesome/free-solid-svg-icons";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-load-all-shnippits-modal.component',
  templateUrl: './load-all-shnippits-modal.component.html',
  styleUrls: ['./load-all-shnippits-modal.component.scss']
})
export class LoadAllShnippitsModalComponent implements OnInit {

    closeIcon = faTimes;
    submitIcon = faPaperPlane

    password: string = ''

    constructor(public activeModal: NgbActiveModal) {}

    ngOnInit(): void {
    }

}
