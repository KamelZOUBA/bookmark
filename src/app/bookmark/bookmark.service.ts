import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Bookmark } from './bookmark.model';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

@Injectable()
export class BookmarkService {

  constructor(private http: HttpClient) { }

  get(userId: string): Observable<Array<Bookmark>> {
    const url = environment.API_URL + 'bookmarks/' + userId;
    return this.http.get(url)
            .catch((error: any) => Observable.throw(error || 'Server error'));

  }

}
