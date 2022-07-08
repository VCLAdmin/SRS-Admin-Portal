import { Injectable } from "@angular/core";
import { LocalStorageService } from "../local-store.service";
import { AuthService } from "./auth.service"
import { LoginService } from "../login.service"
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { map, catchError, delay } from "rxjs/operators";
import { User } from "../../models/user.model";
import { Account } from "../../models/account";
import { of, BehaviorSubject, throwError } from "rxjs";
import { environment } from "environments/environment";
import { NavigationService } from "../navigation.service";

// ================= only for demo purpose ===========
// const DEMO_TOKEN =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjhkNDc4MDc4NmM3MjE3MjBkYzU1NzMiLCJlbWFpbCI6InJhZmkuYm9ncmFAZ21haWwuY29tIiwicm9sZSI6IlNBIiwiYWN0aXZlIjp0cnVlLCJpYXQiOjE1ODc3MTc2NTgsImV4cCI6MTU4ODMyMjQ1OH0.dXw0ySun5ex98dOzTEk0lkmXJvxg3Qgz4ed";

// const DEMO_USER: User = {
//   id: "5b700c45639d2c0c54b354ba",
//   displayName: "Watson Joyce",
//   role: "SA",
// };
// ================= you will get those data from server =======

@Injectable({
  providedIn: "root",
})
export class JwtAuthService {
  token;
  isAuthenticated: Boolean;
  user: User;
  user$ = (new BehaviorSubject<User>(this.user));
  signingIn: Boolean;
  return: string;
  JWT_TOKEN = "JWT_TOKEN";
  APP_USER = "EGRET_USER";

  constructor(
    private ls: LocalStorageService,
    private http: HttpClient,
    private authService: AuthService,
    private loginService: LoginService,
    private navigationService: NavigationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.queryParams
      .subscribe(params => this.return = params['return'] || '/');
  }

  public signin(username, password, returnURL) {

    // return of({token: DEMO_TOKEN, user: DEMO_USER})
    //   .pipe(
    //     delay(1000),
    //     map((res: any) => {
    //       this.setUserAndToken(res.token, res.user, !!res);
    //       this.signingIn = false;
    //       return res;
    //     }),
    //     catchError((error) => {
    //       return throwError(error);
    //     })
    //   );

    // FOLLOWING CODE SENDS SIGNIN REQUEST TO SERVER

    this.signingIn = true;
    return this.authService.login(username, password)
      //return this.http.post(`${environment.apiURL}/auth/local`, { username, password })
      .pipe(
        map((res: any) => {
          //this.setUserAndToken(res.token, res.user, !!res);
          this.signingIn = false;
          let currentAccount: Account = new Account(username, password, "en-US");
          this.loginService.SignIn(currentAccount).subscribe((user) => {

            if (user && user.UserGuid) {
              this.loginService.currentUser = user;
              currentAccount.User = user;
              //this.loginService.ValidateHash(currentAccount).subscribe((isValid: boolean) => {

                //if (isValid) {
                  //this.ls.setValue<any>('currentUser', JSON.stringify(currentAccount.User));
                  this.ls.setValue<User>('currentUser', currentAccount.User);

                  var superAdmin = user.AccessRoles.includes("SRSAdministrator") ? true : false;
                  var FabricatorUser = user.AccessRoles.includes("Fabricator") ? true : false;
                  var DealerFull = user.AccessRoles.includes("Dealer-Full") ? true : false;
                  if (superAdmin) {
                    this.navigationService.publishNavigationChange('icon-menu');
                    //isAuthentificated = true;
                    if (returnURL == "/dashboard" || returnURL == "/") { returnURL = "/dashboard/default"; }
                  }

                  if (FabricatorUser) {
                    this.navigationService.publishNavigationChange('icon-menu-fabricator');
                    if (returnURL == "/dashboard" || returnURL == "/") { returnURL = "/dashboard/fabricator"; }
                  }
                  if (!superAdmin && !FabricatorUser) { 
                    returnURL = "/sessions/signin";
                    this.signout();
                    throw Error("Access Denied");
                  }
                  //If you want to allow Dealers to access fabricator portal uncomment below lines and comment above 3 lines.
                  // if (DealerFull) {
                  //   this.navigationService.publishNavigationChange('icon-menu-fabricator');
                  //   if (returnURL == "/dashboard" || returnURL == "/") { returnURL = "/dashboard/fabricator"; }
                  // }

                  this.router.navigateByUrl(returnURL);

                //}
              // }, error => {
              //   console.log(error);
              //   // this.showLoader = false;
              // });
            } else {
              // this.showLoader = false
              // this.username = '';
              // this.password = '';
              // this.checkedTnC = false;
            }
          }, error => {
            console.log(error);
            // this.showLoader = false;
            // this.InvalidUserContainer = true;
          });
          return res;
        }),
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  /*
    checkTokenIsValid is called inside constructor of
    shared/components/layouts/admin-layout/admin-layout.component.ts
  */
  public checkTokenIsValid() {
    // return of(DEMO_USER)
    //   .pipe(
    //     map((profile: User) => {
    //       this.setUserAndToken(this.getJwtToken(), profile, true);
    //       this.signingIn = false;
    //       return profile;
    //     }),
    //     catchError((error) => {
    //       return of(error);
    //     })
    //   );

    /*
      The following code get user data and jwt token is assigned to
      Request header using token.interceptor
      This checks if the existing token is valid when app is reloaded
    */

    // return this.http.get(`${environment.apiURL}/api/users/profile`)
    //   .pipe(
    //     map((profile: User) => {
    //       this.setUserAndToken(this.getJwtToken(), profile, true);
    //       return profile;
    //     }),
    //     catchError((error) => {
    //       this.signout();
    //       return of(error);
    //     })
    //   );
  }

  public signout() {

    this.authService.logOut();
    //this.setUserAndToken(null, null, false);
    this.router.navigateByUrl("sessions/signin");
  }

  isLoggedIn(): Boolean {

    //return !!this.getJwtToken();
    return !!this.authService.getAuthorizationToken();
  }

  // getJwtToken() {
  //   return this.ls.getItem(this.JWT_TOKEN);
  // }
  // getUser() {
  //   return this.ls.getItem(this.APP_USER);
  // }

  // setUserAndToken(token: String, user: User, isAuthenticated: Boolean) {
  //   this.isAuthenticated = isAuthenticated;
  //   this.token = token;
  //   this.user = user;
  //   this.user$.next(user);
  //   this.ls.setItem(this.JWT_TOKEN, token);
  //   this.ls.setItem(this.APP_USER, user);
  // }
}
