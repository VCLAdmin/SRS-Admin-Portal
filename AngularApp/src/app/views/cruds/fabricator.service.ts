import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { FabricatorApiModel } from 'app/shared/models/FabricatorApiModel'
import { delay } from 'rxjs/operators';
import { AppconstantsService } from 'app/shared/services/appconstants.service';

@Injectable()
export class FabricatorService {
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
 * This function is to get the list of fabricators from API call.
 * 
 * @returns {FabricatorApiModel} returns the list of fabricators from API call.
 * 
 */
  getItems(): Observable<FabricatorApiModel[]> {
    // return  of(this.items.slice())
    let url: string = this.appConstantService.APP_DOMAIN + "api/Fabricator/Get";
    return this.http.get<FabricatorApiModel[]>(url);
  }

 /**
 * This function calls the api to add the fabricator and will get the updated fabricators list .
 * 
 * @param {FabricatorApiModel} item is the fabricator object which needs to be added and it passed as input parameter throuh api call
 * 
 * @returns {any} returns the fabricators list with the added fabricator from API call.
 * 
 */
  addItem(item: FabricatorApiModel): Observable<any> {
    // item._id = Math.round(Math.random() * 10000000000).toString();
    // this.items.unshift(item);
    // return of(this.items.slice()).pipe(delay(1000));
    let url: string = this.appConstantService.APP_DOMAIN + "api/Fabricator/Post";
    return this.http.post<FabricatorApiModel[]>(url, item);
  }

 /**
 * This function calls the api to update the fabricator and will get the updated fabricators list .
 * 
 * @param {FabricatorApiModel} item is the fabricator object which needs to be updated and it passed as input parameter throuh api call
 * 
 * @param {any} id the id of the selected fabricator by which fabricator details will be updated.
 * 
 * @returns {any} returns the fabricators list with the added fabricator from API call.
 * 
 */
  updateItem(id, item: FabricatorApiModel): Observable<any> {
    // this.items = this.items.map(i => {
    //   if(i._id === id) {
    //     return Object.assign({}, i, item);
    //   }
    //   return i;
    // })
    // return of(this.items.slice()).pipe(delay(1000));
    let url: string = this.appConstantService.APP_DOMAIN + "api/Fabricator/Put/" + id;
    return this.http.put<FabricatorApiModel[]>(url, item);
  }

 /**
 * This function is used to valid the updated fabricator record
 * 
 * @param {FabricatorApiModel} row is the fabricator object which needs to be validated.
 * 
 * @returns {any} returns the fabricators list with the updated list from API call.
 * 
 */
  validateUpdate(id, item: FabricatorApiModel): Observable<any> {
    let url: string = this.appConstantService.APP_DOMAIN + "api/Fabricator/ValidateUpdate/" + id;
    return this.http.put<FabricatorApiModel[]>(url, item);
  }

 /**
 * This function calls the api to remove the fabricator and will get the updated fabricators list .
 * 
 * @param {FabricatorApiModel} row is the fabricator object which needs to be removed and it passed as input parameter through api call.
 * 
 * @returns {any} returns the fabricators list with the updated list from API call.
 * 
 */  
  removeItem(row: FabricatorApiModel) {

    // let i = this.items.indexOf(row);
    // this.items.splice(i, 1);
    // return of(this.items.slice()).pipe(delay(1000));
    let url: string = this.appConstantService.APP_DOMAIN + "api/Fabricator/Delete/" + row.FabricatorGuid;
    return this.http.delete<FabricatorApiModel[]>(url);
  }

 /**
 * This function calls the api to remove the fabricator and will get the updated fabricators list .
 * 
 * @param {FabricatorApiModel} row is the fabricator object which needs to be removed and it passed as input parameter through api call.
 * 
 * @returns {any} returns the fabricators list with the updated list from API call.
 * 
 */ 
  canRemoveItem(row: FabricatorApiModel) {

    // let i = this.items.indexOf(row);
    // this.items.splice(i, 1);
    // return of(this.items.slice()).pipe(delay(1000));
    let url: string = this.appConstantService.APP_DOMAIN + "api/Fabricator/CanDelete/" + row.FabricatorGuid;
    return this.http.get<boolean>(url);
  }
}
