import {Injectable} from '@angular/core';
import {JsonData} from "../models/jsonData";
import {LocalStorageService} from "./local-storage.service";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {IAppComment, IComment} from "../models/Comment";
import {combineLatest} from "rxjs";
import {UsersService} from "./users.service";
import {IUser} from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class CommentsService extends JsonData<IAppComment> {

  private commentsWithUsers = combineLatest([
    this.data$,
    this.usersService.users$,
  ]).pipe(
    map(([comments, users]) => comments.map(c => {
      c.user = users.find(u => u.id === c.ownerId);
      return c;
    }))
  )

  comments$ = this.commentsWithUsers.pipe(
    map(comments => this.orderComments(comments)),
  );

  currentUser: IUser | null = null;

  constructor(
    protected lsService: LocalStorageService,
    protected http: HttpClient,
    private usersService: UsersService,
  ) {
    super(lsService, http, 'assets/comments.json', 'app_comments');
    this.usersService.currentUser$.subscribe(user => {
      this.currentUser = user;
    })
  }

  private orderComments(comments: IAppComment[], parentId: number | null = null, acc: IAppComment[] = []): IAppComment[] {
    comments.filter(c => c.parentCommentId === parentId)
      .sort((a, b) => +new Date(a.createdAt) - +new Date(b.createdAt))
      .forEach(c => {
        if (parentId === null) {
          acc.push(c);
        }
        c.subComments = comments.filter(sc => sc.parentCommentId === c.id);
        this.orderComments(comments, c.id, acc);
      });
    return acc.filter(c => c.deletedAt === null);
  }

  addComment(text: string, parentId: number | null) {
    if (this.currentUser) {
      const newComment: IComment = {
        id: NaN,
        txt: text,
        ownerId: this.currentUser.id,
        createdAt: new Date().toISOString(),
        deletedAt: null,
        parentCommentId: parentId,
      }
      super.add(newComment);
    }
  }

  editComment(comment: IComment, newText: string) {
    super.edit({
      ...comment,
      txt: newText,
      createdAt: new Date().toISOString(),
    });
  }

  deleteComment(comment: IAppComment) {
    super.edit({
      ...comment,
      deletedAt: new Date().toISOString(),
      subComments: comment.subComments
        ?.map(c => ({...c, deletedAt: new Date().toISOString()}))
    });
  }

}
