import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {EditService} from "../../services/edit.service";
import {UsersService} from "../../services/users.service";
import {combineLatest, Subscription} from "rxjs";

@Component({
  selector: 'app-comment-text-form',
  templateUrl: './comment-text-form.component.html',
  styleUrls: ['./comment-text-form.component.scss']
})
export class CommentTextFormComponent implements OnInit, OnDestroy {

  form = new FormControl('', Validators.required);

  currentUser$ = this.usersService.currentUser$;

  sub?: Subscription;

  constructor(
    private editService: EditService,
    private usersService: UsersService,
  ) {
  }

  ngOnInit(): void {
    this.sub = combineLatest([
      this.editService.isEdit$,
      this.editService.selectedComment$,
    ]).subscribe(([isEdit, comment]) => {
      if (isEdit) {
        this.form.setValue(comment?.txt);
      }
    })
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  save() {
    if (this.form.valid) {
      this.editService.isEdit$.value
        ? this.editService.editComment(this.form.value)
        : this.editService.addComment(this.form.value);
    }
  }

  clicked(ev: MouseEvent) {
    ev.stopPropagation();
  }

}
