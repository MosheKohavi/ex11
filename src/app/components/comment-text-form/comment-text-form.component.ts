import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {EditService} from "../../services/edit.service";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-comment-text-form',
  templateUrl: './comment-text-form.component.html',
  styleUrls: ['./comment-text-form.component.scss']
})
export class CommentTextFormComponent implements OnInit {

  form = new FormControl('', Validators.required);

  currentUser$ = this.usersService.currentUser$

  constructor(
    private editService: EditService,
    private usersService: UsersService,
  ) {
  }

  ngOnInit(): void {
  }

  save() {
    if (this.form.valid) {
      this.editService.isEdit
        ? this.editService.editComment(this.form.value)
        : this.editService.addComment(this.form.value);
    }
  }

  clicked(ev: MouseEvent) {
    ev.stopPropagation();
  }

}
