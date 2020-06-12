import {Injectable} from '@angular/core';
import {IDBPDatabase, IDBPTransaction, openDB} from 'idb';
import {Shnippit} from "../model/Shnippit.model";
import {from, Observable} from 'rxjs';
import {catchError} from "rxjs/operators";

let DB_NAME: string = 'shnippit-db';
let STORE_NAME: string = 'shnippits';

@Injectable({
    providedIn: 'root'
})
export class LocalCacheService {

    private connection: Promise<IDBPDatabase>;

    constructor() {
        this.connection = openDB(DB_NAME, 2, {
            upgrade(database: IDBPDatabase, oldVersion: number, newVersion: number | null, transaction: IDBPTransaction): void {
                if (!database.objectStoreNames.contains(STORE_NAME)) {
                    database.createObjectStore(STORE_NAME, {
                        keyPath: 'publicId'
                    });
                }
            }
        });
    }

    createShnippit(shnippit: Shnippit): Observable<void> {
        let promise = this.connection.then((db: IDBPDatabase) => {
            let transaction = db.transaction(STORE_NAME, 'readwrite')
            let store = transaction.objectStore(STORE_NAME)
            store.add(shnippit)
            return transaction.done
        });
        return from(promise);
    }

    getShnippitByPublicId(publicId: string): Observable<Shnippit> {
        let promise = this.connection.then((db: IDBPDatabase) => {
            let transaction = db.transaction(STORE_NAME, 'readwrite')
            let store = transaction.objectStore(STORE_NAME)
            return store.get(publicId)
        });
        return from(promise);
    }

    saveShnippit(shnippit: Shnippit): Observable<void> {
        return this.updateShnippit(shnippit).pipe(
            catchError(err => {
                return this.createShnippit(shnippit);
            })
        )
    }

    getAllShnippits(): Observable<Shnippit[]> {
        let promise = this.connection.then((db: IDBPDatabase) => {
            let transaction = db.transaction(STORE_NAME, 'readwrite')
            let store = transaction.objectStore(STORE_NAME)
            return store.getAll()
        });
        return from(promise);
    }

    updateShnippit(shnippit: Shnippit): Observable<void> {
        let promise = this.connection.then((db: IDBPDatabase) => {
            let transaction = db.transaction(STORE_NAME, 'readwrite')
            let store = transaction.objectStore(STORE_NAME)
            store.put(shnippit)
            return transaction.done
        });
        return from(promise);
    }

    deleteShnippitByPublicId(publicId: string): Observable<void> {
        let promise = this.connection.then((db: IDBPDatabase) => {
            let transaction = db.transaction(STORE_NAME, 'readwrite')
            let store = transaction.objectStore(STORE_NAME)
            return store.delete(publicId)
            return transaction.done
        });
        return from(promise);
    }

}
