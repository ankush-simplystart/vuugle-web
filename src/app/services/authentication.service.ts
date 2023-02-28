import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  isLogined = new BehaviorSubject<boolean>(false);
  constructor() {}

  setLoginStatus(status: boolean) {
    this.isLogined.next(status);
  }

  getLoginStatus(): boolean {
    return this.isLogined.getValue();
  }
}
