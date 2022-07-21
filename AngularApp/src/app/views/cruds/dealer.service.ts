import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { DealerApiModel } from 'app/shared/models/DealerApiModel'
import { delay } from 'rxjs/operators';
import { AppconstantsService } from 'app/shared/services/appconstants.service';
import { FinancialApiModel } from 'app/shared/models/FinancialApiModel';

@Injectable()
export class DealerService {
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
 * This function is to get the list of dealers from API call.
 * 
 * @returns {DealerApiModel} returns the list of dealers from API call.
 * 
 */
  getItems(): Observable<DealerApiModel[]> {
    // return  of(this.items.slice())
    let url: string = this.appConstantService.APP_DOMAIN + "api/Dealer/Get";
    return this.http.get<DealerApiModel[]>(url);
  }

 /**
 * This function calls the api to add the dealer and will get the updated dealers list .
 * 
 * @param {DealerApiModel} item is the dealer object which isneeds to be added and it passed as input parameter throuh api call
 * 
 * @returns {any} returns the dealers list with the added dealer from API call.
 * 
 */
  addItem(item: DealerApiModel): Observable<any> {
    // item._id = Math.round(Math.random() * 10000000000).toString();
    // this.items.unshift(item);
    // return of(this.items.slice()).pipe(delay(1000));
    let url: string = this.appConstantService.APP_DOMAIN + "api/Dealer/Post";
    return this.http.post<DealerApiModel[]>(url, item);
  }

 /**
 * This function calls the api to update the dealer and will get the updated dealers list .
 * 
 * @param {DealerApiModel} item is the dealer object which needs to be updated and it passed as input parameter throuh api call
 * 
 * @param {any} id the id of the selected dealer by which dealer details will be updated.
 * 
 * @returns {any} returns the dealers list with the added dealer from API call.
 * 
 */
  updateItem(id, item: DealerApiModel): Observable<any> {
    // this.items = this.items.map(i => {
    //   if(i._id === id) {
    //     return Object.assign({}, i, item);
    //   }
    //   return i;
    // })
    // return of(this.items.slice()).pipe(delay(1000));
    let url: string = this.appConstantService.APP_DOMAIN + "api/Dealer/Put/" + id;
    return this.http.put<DealerApiModel[]>(url, item);
  }

 /**
 * This function calls the api to remove the dealer and will get the updated dealers list .
 * 
 * @param {DealerApiModel} row is the dealer object which needs to be removed and it passed as input parameter through api call.
 * 
 * @returns {any} returns the dealers list with the updated list from API call.
 * 
 */
  removeItem(row: DealerApiModel) {

    // let i = this.items.indexOf(row);
    // this.items.splice(i, 1);
    // return of(this.items.slice()).pipe(delay(1000));
    let url: string = this.appConstantService.APP_DOMAIN + "api/Dealer/Delete/" + row.DealerGuid;
    return this.http.delete<DealerApiModel[]>(url);
  }

 /**
 * This function calls the api to remove the dealer and will get the updated dealers list .
 * 
 * @param {DealerApiModel} row is the dealer object which needs to be removed and it passed as input parameter through api call.
 * 
 * @returns {any} returns the dealers list with the updated list from API call.
 * 
 */
  canRemoveItem(row: DealerApiModel) {

    // let i = this.items.indexOf(row);
    // this.items.splice(i, 1);
    // return of(this.items.slice()).pipe(delay(1000));
    let url: string = this.appConstantService.APP_DOMAIN + "api/Dealer/CanDelete/" + row.DealerGuid;
    return this.http.get<boolean>(url);
  }

 /**
 * This function is to get the list of financials from API call.
 * 
 * @returns {any} returns the list of financials from API call.
 */
  getFinancials(): Observable<FinancialApiModel[]> {
    // return  of(this.items.slice())
    let url: string = this.appConstantService.APP_DOMAIN + "api/Financial/Get";
    return this.http.get<FinancialApiModel[]>(url);
  }

 /**
 * This function calls the api to update the financial and will get the updated financials list .
 * 
 * @param {FinancialApiModel} item is the financial object which needs to be updated and it passed as input parameter throuh api call
 * 
 * @param {any} id the id of the selected financial by which financial details will be updated.
 * 
 * @returns {any} returns the financials list with the added financial from API call.
 * 
 */
  updateFinancial(id, item: FinancialApiModel): Observable<any> {
    let url: string = this.appConstantService.APP_DOMAIN + "api/Financial/Put/" + id;
    return this.http.put<FinancialApiModel[]>(url, item);
  }

}