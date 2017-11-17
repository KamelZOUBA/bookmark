import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Bookmark } from './bookmark.model';
import { BookmarkService } from './bookmark.service';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css'],
  providers:  [BookmarkService]
})
export class BookmarkComponent implements OnInit {
  subObservable: any;
  errorMessage: string;
  routeId: number;
  bookMarks: Bookmark[];

  constructor(private bookmarkService: BookmarkService, private route: ActivatedRoute) {
   }

  ngOnInit() {
      this.bookmarkService.get('15').subscribe(
        (observableUser) => {
          this.bookMarks = observableUser;
          console.log(this.bookMarks);
        }
        , (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            console.log('An error occurred:', err.error.message);
            this.errorMessage = 'An error occurred: ' + err.error.message;
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
            this.errorMessage = `Backend returned code ${err.status}, body was: ${err.error}`;
          }
        }

  );
  }

}
