import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Shnippit} from "../model/Shnippit.model";
import {Attachment} from "../model/Attachment.model";
import {LocalCacheService} from "./local-cache.service";
import {catchError, tap} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class BackendService {

    constructor(private httpClient: HttpClient,
                private localCacheService: LocalCacheService) {
    }

    public createShnippit(shnippit: Shnippit): Observable<Shnippit> {
        return this.httpClient.post<Shnippit>(`/api/v1/shnippits`, {
            text: shnippit.text
        }).pipe(
            tap(shnippit => {
                return this.localCacheService.saveShnippit(shnippit)
            })
        );
    }

    public getShnippit(publicId: string): Observable<Shnippit> {
        return this.httpClient.get<Shnippit>(`/api/v1/shnippits/${publicId}`)
            .pipe(
                // Success: save/update in cache
                tap(shnippit => {
                    return this.localCacheService.saveShnippit(shnippit)
                }),
                // Error: try to find in cache
                catchError(err => {
                    return this.localCacheService.getShnippitByPublicId(publicId)
                })
            );;
    }

    public updateShnippit(shnippit: Shnippit): Observable<Shnippit> {
        return this.httpClient.put<Shnippit>(`/api/v1/shnippits/${shnippit.publicId}`, {
            publicId: shnippit.publicId,
            text: shnippit.text,
            type: shnippit.type
        }).pipe(
            tap(shnippit => {
                this.localCacheService.saveShnippit(shnippit)
            })
        );
    }

    public getShnippitAttachments(publicId: string): Observable<Attachment[]> {
        return this.httpClient.get<Attachment[]>(`/api/v1/shnippits/${publicId}/attachments`);
    }

    public deleteAttachment(publicId: string, attachmentName: string): Observable<void> {
        return this.httpClient.delete<void>(`/api/v1/shnippits/${publicId}/attachments/${attachmentName}`);
    }

    public deleteShnippit(publicId: string): Observable<void> {
        return this.httpClient.delete<void>(`/api/v1/shnippits/${publicId}`);
    }

    public loadAllShnippits(password: string): Observable<Array<Shnippit>> {
        const requestOptions = {
            headers: new HttpHeaders({'X-Admin-Token': password}),
        };
        return this.httpClient.get<Array<Shnippit>>(`/api/v1/shnippits`, requestOptions).pipe(
            tap(shnippits =>
                shnippits.forEach(shnippit =>
                    this.localCacheService.saveShnippit(shnippit)
                )
            )
        );
    }

}
