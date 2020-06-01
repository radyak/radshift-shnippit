import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NewShnippitComponent} from "./views/new-shnippit/new-shnippit.component";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { DisplayShnippitComponent } from './views/display-shnippit/display-shnippit.component';
import { ShnippitBoardComponent } from './components/shnippit-board/shnippit-board.component';

@NgModule({
    declarations: [
        AppComponent,
        NewShnippitComponent,
        DisplayShnippitComponent,
        ShnippitBoardComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgbModule,
        FormsModule,
        FontAwesomeModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
