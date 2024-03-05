import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError, Observable, of, tap} from "rxjs";
import {UserAccount, UserAddress} from "./user-account";

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {
  private userAccountUrl = 'http://localhost:8080/users';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) { }

  login(user: UserAccount): Observable<UserAccount> {
    return this.http.post<UserAccount>(this.userAccountUrl + '/login', user, this.httpOptions)
      .pipe(
        tap((newUser: UserAccount) => this.log(user.email + " user logged w/ id = " + newUser.id)),
        catchError(this.handleError<UserAccount>("loginWithUserEmail: " + user.email))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(operation + " failed: " + error.message);
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }
}
