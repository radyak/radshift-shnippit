import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MarkdownModule} from 'ngx-markdown';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NewShnippitComponent} from "./views/new-shnippit/new-shnippit.component";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {DisplayShnippitComponent} from './views/display-shnippit/display-shnippit.component';
import {ShnippitBoardComponent} from './components/shnippit-board/shnippit-board.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {LogoComponent} from "./components/logo/logo.component";
import {AngularFileUploaderModule} from "angular-file-uploader";
import {NgxFilesizeModule} from "ngx-filesize";
import { OverviewComponent } from './views/overview/overview.component';
import { DeleteShnippitModalComponent } from './components/delete-shnippit-modal/delete-shnippit-modal.component';
import { LoadAllShnippitsModalComponent } from './components/load-all-shnippits-modal/load-all-shnippits-modal.component';

@NgModule({
    declarations: [
        AppComponent,
        NewShnippitComponent,
        DisplayShnippitComponent,
        ShnippitBoardComponent,
        LogoComponent,
        OverviewComponent,
        DeleteShnippitModalComponent,
        LoadAllShnippitsModalComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgbModule,
        FormsModule,
        FontAwesomeModule,
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
        MarkdownModule.forRoot(),
        AngularFileUploaderModule,
        NgxFilesizeModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
