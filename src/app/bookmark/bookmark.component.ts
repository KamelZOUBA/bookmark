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
  bookMarks: Bookmark[];

  constructor(private bookmarkService: BookmarkService) {
   }

  ngOnInit() {
      this.bookmarkService.getUserBokkmarks('15').subscribe(
        (res) => {
          this.bookMarks = res;
        }
  );
  }

}
