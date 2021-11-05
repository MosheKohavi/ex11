import {Component, HostListener, Input, OnInit} from '@angular/core';
import {IAppComment} from "../../models/Comment";
import {EditService} from "../../services/edit.service";
import {UsersService} from "../../services/users.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() comment!: IAppComment;

  showButtons$ = this.usersService.currentUser$.pipe(
    map(user => user?.id === this.comment?.user?.id)
  );

  constructor(
    private editService: EditService,
    private usersService: UsersService,
  ) { }

  ngOnInit(): void {
  }

  clicked(ev?: MouseEvent) {
    ev?.stopPropagation();
    this.editService.selectedComment$.next(this.comment);
  }

  edit() {
    this.clicked();
    this.editService.isEdit$.next(true);
  }

  delete() {
    this.editService.deleteComment(this.comment);
  }

  deleteCurrentUser() {
    this.usersService.deleteCurrentUser();
    this.usersService.setCurrentUser(null);
  }

}
