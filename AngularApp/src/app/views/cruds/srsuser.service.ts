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

 /**
 * This function is to get the list of Users from API call.
 * 
 * @returns {SRSUserApiModel} returns the list of Users from API call.
 * 
 */
  getItems(): Observable<SRSUserApiModel[]> {
    // return  of(this.items.slice())
    let url: string = this.appConstantService.APP_DOMAIN + "api/SRSUsers/Get";
    return this.http.get<SRSUserApiModel[]>(url);
  }

 /**
 * This function is to get the email of selected user from API call.
 * 
 * @returns {string} returns the email of the user from API call.
 * 
 */
  getEmail(id): Observable<string> {
    // return  of(this.items.slice())
    let url: string = this.appConstantService.APP_DOMAIN + "api/SRSUsers/GetEmail/" + id;
    return this.http.get<string>(url);
  }

 /**
 * This function is to check whether the given email id is already exists or not API call.
 * 
 * @param {string} id is the emailid of the user which has to check whether already exists or not
 * 
 * @returns {boolean} returns the boolean value true or false based on the existence of emailId.
 * 
 */
  isEmailDuplicate(id): Observable<boolean> {
    // return  of(this.items.slice())
    let url: string = this.appConstantService.APP_DOMAIN + "api/SRSUsers/IsEmailDuplicate?email=" + id;
    return this.http.get<boolean>(url);
  }

/**
 * This function calls the api to add the user and will get the updated users list .
 * 
 * @param {SRSUserApiModel} item is the user object which needs to be added and it passed as input parameter throuh api call
 * 
 * @returns {any} returns the users list with the added user from API call.
 * 
 */
  addItem(item: SRSUserApiModel): Observable<any> {
    // item._id = Math.round(Math.random() * 10000000000).toString();
    // this.items.unshift(item);
    // return of(this.items.slice()).pipe(delay(1000));
    let url: string = this.appConstantService.APP_DOMAIN + "api/SRSUsers/Post";
    return this.http.post<SRSUserApiModel[]>(url, item);
  }

 /**
 * This function calls the api to update the user and will get the updated users list .
 * 
 * @param {SRSUserApiModel} item is the user object which needs to be updated and it passed as input parameter throuh api call
 * 
 * @param {any} id the id of the selected user by which user details will be updated.
 * 
 * @returns {any} returns the users list with the added user from API call.
 * 
 */
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

 /**
 * This function calls the api to remove the user and will get the updated users list .
 * 
 * @param {SRSUserApiModel} row is the user object which needs to be removed and it passed as input parameter through api call.
 * 
 * @returns {any} returns the boolean value true or false whether selected user can be removed or not from API call.
 * 
 */ 
  canRemoveItem(row: SRSUserApiModel) {
    let url: string = this.appConstantService.APP_DOMAIN + "api/SRSUsers/CanDelete/" + row.UserGuid;
    return this.http.get<boolean>(url);
  }

 /**
 * This function calls the api to remove the user and will get the updated users list .
 * 
 * @param {SRSUserApiModel} row is the user object which needs to be removed and it passed as input parameter through api call.
 * 
 * @returns {any} returns the fabricators list with the updated list from API call.
 * 
 */ 
  removeItem(row: SRSUserApiModel) {

    // let i = this.items.indexOf(row);
    // this.items.splice(i, 1);
    // return of(this.items.slice()).pipe(delay(1000));
    let url: string = this.appConstantService.APP_DOMAIN + "api/SRSUsers/Delete/" + row.UserGuid;
    return this.http.delete<SRSUserApiModel[]>(url);
  }
}
