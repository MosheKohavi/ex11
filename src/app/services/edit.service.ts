import {Injectable} from '@angular/core';
import {UsersService} from "./users.service";
import {CommentsService} from "./comments.service";
import {first} from "rxjs/operators";
import {IComment} from "../models/Comment";

@Injectable({
  providedIn: 'root'
})
export class EditService {

  selectedComment: IComment | null = null;

  isEdit: boolean = false;

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
    this.commentsService.addComment(text, this.selectedComment?.id || null);
  }

  editComment(text: string) {
    if (this.selectedComment) {
      this.commentsService.editComment(this.selectedComment, text);
    }
  }

  deleteComment(comment: IComment) {
    this.commentsService.deleteComment(comment);
  }

}
