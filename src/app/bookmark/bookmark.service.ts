import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Bookmark } from './bookmark.model';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BookmarkService {

  constructor(public http: HttpClient) { }

  getUserBokkmarks(userId: string): Observable <Array<Bookmark>> {
    const url = environment.API_URL + 'bookmarks/' + userId;
    return this.http.get(url);

  }

}
