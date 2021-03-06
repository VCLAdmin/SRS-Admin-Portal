import { Injectable } from '@angular/core';
import { AppconstantsService } from './appconstants.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Account } from '../models/account';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUser: User = new User();

  constructor(private appConstantService: AppconstantsService, private http: HttpClient) { }

  SignIn(account): Observable<User> {

    let url: string = this.appConstantService.APP_DOMAIN + "api/AccountPrevious/SignIn";
    return this.http.post<User>(url, account);
  }
  ValidateHash(account: Account): Observable<boolean> {
    let url: string = this.appConstantService.APP_DOMAIN + "api/AccountPrevious/ValidateHash";
    return this.http.post<boolean>(url, account);
  }
  GetVersionInformation(): Observable<any> {
    let url: string = this.appConstantService.APP_DOMAIN + "api/AccountPrevious/GetVersionInformation";
    return this.http.get<any>(url);
  }
}