import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewShnippitComponent} from "./views/new-shnippit/new-shnippit.component";


const routes: Routes = [
    {
        path: '',
        component: NewShnippitComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
