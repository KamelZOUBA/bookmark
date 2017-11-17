
import { AppComponent } from './app.component';
import { BookmarkComponent } from './bookmark/bookmark.component';
import {Routes} from '@angular/router';


export const ROUTES: Routes = [
  {path: '', component: AppComponent},
  {path: 'user', component: BookmarkComponent}
];
