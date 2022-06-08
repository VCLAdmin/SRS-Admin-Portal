import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { JwtAuthService } from "../services/auth/jwt-auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthService } from "../services/auth/auth.service";

@Injectable()
export class FabricatorRoleGuard implements CanActivate {
  constructor(private router: Router, private jwtAuth: AuthService, private snack: MatSnackBar) { }

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  //   var user = this.jwtAuth.getCurrentUserData();
  //   var superAdmin = user.AccessRoles.includes("SRSAdministrator")? true : false;
  //   //superAdmin = true;

  //   if (
  //     user &&
  //     route.data &&
  //     route.data.roles && superAdmin
  //     // route.data.roles.includes(user.AccessRoles)
  //   ) {
  //     return true;
  //   } else {
  //     this.snack.open('You do not have access to this page!', 'OK');
  //     return false;
  //   }
  // }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    var user = this.jwtAuth.getCurrentUserData();
    var FabricatorUser = user.AccessRoles.includes("Fabricator") ? true : false;
    var DealerFull = user.AccessRoles.includes("Dealer-Full") ? true : false;

    if (
      user && (FabricatorUser || DealerFull)
      // route.data.roles.includes(user.AccessRoles)   route.data &&
      // route.data.roles && 
    ) {
      return true;
    } else {
      this.snack.open('You do not have access to this page!', 'OK');
      return false;
    }
  }
}
