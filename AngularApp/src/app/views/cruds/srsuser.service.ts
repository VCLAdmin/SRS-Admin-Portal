import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { SRSUserApiModel } from '../../shared/models/SRSUserApiModel';
import { AppconstantsService } from '../../shared/services/appconstants.service';

@Injectable()
export class SRSUserService {
  items: any[];
  constructor(
    private appConstantService: AppconstantsService,
    private http: HttpClient
  ) {
    // let userDB = new UserDB();
    // this.items = userDB.users;
  }

  //******* Implement your APIs ********
  getItems(): Observable<SRSUserApiModel[]> {
    // return  of(this.items.slice())
    let url: string = this.appConstantService.APP_DOMAIN + "api/SRSUsers/Get";
    return this.http.get<SRSUserApiModel[]>(url);
  }

  getEmail(id): Observable<string> {
    // return  of(this.items.slice())
    let url: string = this.appConstantService.APP_DOMAIN + "api/SRSUsers/GetEmail/" + id;
    return this.http.get<string>(url);
  }

  isEmailDuplicate(id): Observable<boolean> {
    // return  of(this.items.slice())
    let url: string = this.appConstantService.APP_DOMAIN + "api/SRSUsers/IsEmailDuplicate?email=" + id;
    return this.http.get<boolean>(url);
  }
  addItem(item: SRSUserApiModel): Observable<any> {
    // item._id = Math.round(Math.random() * 10000000000).toString();
    // this.items.unshift(item);
    // return of(this.items.slice()).pipe(delay(1000));
    let url: string = this.appConstantService.APP_DOMAIN + "api/SRSUsers/Post";
    return this.http.post<SRSUserApiModel[]>(url, item);
  }
  updateItem(id, item: SRSUserApiModel): Observable<any> {
    // this.items = this.items.map(i => {
    //   if(i._id === id) {
    //     return Object.assign({}, i, item);
    //   }
    //   return i;
    // })
    // return of(this.items.slice()).pipe(delay(1000));
    let url: string = this.appConstantService.APP_DOMAIN + "api/SRSUsers/Put/" + id;
    return this.http.put<SRSUserApiModel[]>(url, item);
  }
  canRemoveItem(row: SRSUserApiModel) {
    let url: string = this.appConstantService.APP_DOMAIN + "api/SRSUsers/CanDelete/" + row.UserGuid;
    return this.http.get<boolean>(url);
  }
  removeItem(row: SRSUserApiModel) {

    // let i = this.items.indexOf(row);
    // this.items.splice(i, 1);
    // return of(this.items.slice()).pipe(delay(1000));
    let url: string = this.appConstantService.APP_DOMAIN + "api/SRSUsers/Delete/" + row.UserGuid;
    return this.http.delete<SRSUserApiModel[]>(url);
  }
}
