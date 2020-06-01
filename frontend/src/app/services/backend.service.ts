import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Shnippit} from "../model/Shnippit.model";

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private httpClient: HttpClient) { }

    public createShnippit(shnippit: Shnippit): Observable<Shnippit> {
        return this.httpClient.post<Shnippit>(`api/v1/shnippits`, {
            text: shnippit.text
        });
    }

    public getShnippit(publicId: string): Observable<Shnippit> {
        return this.httpClient.get<Shnippit>(`api/v1/shnippits/${publicId}`);
    }
}
