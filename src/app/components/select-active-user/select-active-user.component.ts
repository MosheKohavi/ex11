import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UsersService} from "../../services/users.service";
import {Observable} from "rxjs";
import {IUser} from "../../models/User";
import {first, map} from "rxjs/operators";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-active-user',
  templateUrl: './select-active-user.component.html',
  styleUrls: ['./select-active-user.component.scss']
})
export class SelectActiveUserComponent implements OnInit {

  users$: Observable<IUser[]> = this.usersService.users$;

  form = new FormControl();

  @Output() select: Observable<number> = this.form.valueChanges.pipe(
    map(v => +v)
  );

  constructor(
    private usersService: UsersService,
  ) {
  }

  ngOnInit(): void {
    this.users$.pipe(first(users => !!users.length)).subscribe(users => {
      this.form.setValue(users[0].id);
    });
  }

}
