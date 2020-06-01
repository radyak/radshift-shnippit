import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewShnippitComponent} from "./views/new-shnippit/new-shnippit.component";
import {DisplayShnippitComponent} from "./views/display-shnippit/display-shnippit.component";


const routes: Routes = [
    {
        path: '',
        component: NewShnippitComponent
    },
    {
        path: ':publicId',
        component: DisplayShnippitComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
