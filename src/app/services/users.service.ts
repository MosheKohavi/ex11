import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LocalStorageService} from "./local-storage.service";
import {JsonData} from "../models/jsonData";
import {IUser} from "../models/User";
import {BehaviorSubject} from "rxjs";
import {first} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UsersService extends JsonData<IUser> {

  private _currentUser$ = new BehaviorSubject<IUser | null>(null);

  public currentUser$ = this._currentUser$.asObservable();

  users$ = this.data$;

  constructor(
    protected lsService: LocalStorageService,
    protected http: HttpClient,
  ) {
    super(lsService, http, 'assets/users.json', 'app_users');
  }

  setCurrentUser(id: number | null) {
    this.users$.pipe(first()).subscribe(users => {
      const user = users.find(u => u.id === id);
      this._currentUser$.next(user || null);
    })
  }

  deleteCurrentUser() {
    const currentUser = this._currentUser$.value;
    if (currentUser) {
      super.delete(currentUser.id);
    }
  }

}
