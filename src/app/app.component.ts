import { Component } from '@angular/core';
import {UsersService} from "./services/users.service";
import {CommentsService} from "./services/comments.service";
import {IUser} from "./models/User";
import {EditService} from "./services/edit.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  comments$ = this.commentsService.comments$;

  constructor(
    private usersService: UsersService,
    private commentsService: CommentsService,
    private editService: EditService,
  ) {
    usersService.users$.subscribe(console.log)
    commentsService.comments$.subscribe(console.log)
    setInterval(() => {}, 1000)
  }

  onUserSelect(id: number | null) {
    this.usersService.setCurrentUser(id);
  }

  clicked() {
    this.editService.selectedComment$.next(null);
    this.editService.isEdit$.next(false);
  }

}
