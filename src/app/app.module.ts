import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BookmarkComponent } from './bookmark/bookmark.component';
import {HttpClientModule} from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import { UserComponent } from './user/user.component';
import {FormsModule} from '@angular/forms';
import { BlockCopypasteDirective } from './block-copypaste.directive';

@NgModule({
  declarations: [
    AppComponent,
    BookmarkComponent,
    UserComponent,
    BlockCopypasteDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
