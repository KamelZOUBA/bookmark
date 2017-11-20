
import { AppComponent } from './app.component';
import { BookmarkComponent } from './bookmark/bookmark.component';
import {Routes} from '@angular/router';
import { UserComponent } from './user/user.component';


export const ROUTES: Routes = [
  {path: 'bookmarks', component: BookmarkComponent},
  {path: 'users', component: UserComponent}
];
