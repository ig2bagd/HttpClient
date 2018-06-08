import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
// import 'rxjs/add/operator/map'
import { map } from 'rxjs/operators';
import { Book } from './book';
import { Writer } from './writer';

@Injectable()
export class WriterService {

    constructor(private http: HttpClient) { }

    textUrl = "/api/message";
    getTextMsg(): Observable<string> {
        return this.http.get(this.textUrl, { responseType: 'text' });
    }

    bookUrl = "/api/books";
    getBooks(): Observable<Book[]> {
        return this.http.get<Book[]>(this.bookUrl);
    }
    filterBooks(category: string, year: string): Observable<Book[]> {
        let httpHeaders = new HttpHeaders()
            .set('Content-Type', 'application/json');
        let httpParams = new HttpParams()
                            .set('category', category)
                            .set('year', year);    

        // let httpParams = new HttpParams()
        //                     .append('category', category)
        //                     .append('year', year);

        // console.log('params: ' + httpParams.toString());
        // console.log(httpHeaders.keys());
        // return this.http.get<Book[]>(this.bookUrl, {
        //                             // headers: httpHeaders,
        //                             params: httpParams
        //                             // responseType: 'json'
        // });
        
        return this.http.get<Book[]>(this.bookUrl + '?' + httpParams.toString());

        // return this.http.get<Book[]>(this.bookUrl + '?category=' + category + '&year=' + year, {
        // 	        headers: httpHeaders,
        // 	        responseType: 'json'
        // 		});
    }

    writerUrl = "/api/writer";
    getWriterWithFavBooks(): Observable<any> {
        return this.http.get(this.writerUrl, { responseType: 'json' });
    }
    getFavoriteWriter(): Observable<Writer> {
        return this.http.get<Writer>(this.writerUrl, { responseType: 'json' });
    }
    getFullResponseForWriter(): Observable<HttpResponse<any>> {
        return this.http.get(this.writerUrl, {
            observe: 'response'
        });
    }

    myUrl = "/api/invalid";
    getDataForUrl(): Observable<any> {
        return this.http.get(this.myUrl);
    }
}