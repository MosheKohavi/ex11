import {Injectable} from '@angular/core';
import {UsersService} from "./users.service";
import {CommentsService} from "./comments.service";
import {first} from "rxjs/operators";
import {IComment} from "../models/Comment";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EditService {

  selectedComment$ = new BehaviorSubject<IComment | null>(null);

  isEdit$ = new BehaviorSubject<boolean>(false)

  constructor(
    private usersService: UsersService,
    private commentsService: CommentsService,
  ) {
  }

  deleteUser() {
    this.commentsService.comments$.pipe(first()).subscribe(comments => {
      comments.forEach(c => this.commentsService.deleteComment(c));
      this.usersService.deleteCurrentUser();
    })
  }

  addComment(text: string) {
    this.commentsService.addComment(text, this.selectedComment$.value?.id || null);
  }

  editComment(text: string) {
    if (this.selectedComment$.value) {
      this.commentsService.editComment(this.selectedComment$.value, text);
    }
  }

  deleteComment(comment: IComment) {
    this.commentsService.deleteComment(comment);
  }

}
