import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUsersApi } from '../type/apiusers.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersSubject = new BehaviorSubject<IUsersApi[]>([]);
  public users$ = this.usersSubject.asObservable();

  setUsers(users: IUsersApi[]) {
    this.usersSubject.next(users);
  }
}
