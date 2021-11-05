import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { SelectActiveUserComponent } from './components/select-active-user/select-active-user.component';
import { CommentComponent } from './components/comment/comment.component';
import { CommentsListComponent } from './components/comments-list/comments-list.component';
import {TimePipe} from "./pipes/time.pipe";
import { CommentTextFormComponent } from './components/comment-text-form/comment-text-form.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    SelectActiveUserComponent,
    CommentComponent,
    CommentsListComponent,
    TimePipe,
    CommentTextFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
