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
  getItems(): Observable<DealerApiModel[]> {
    // return  of(this.items.slice())
    let url: string = this.appConstantService.APP_DOMAIN + "api/Dealer/Get";
    return this.http.get<DealerApiModel[]>(url);
  }
  addItem(item: DealerApiModel): Observable<any> {
    // item._id = Math.round(Math.random() * 10000000000).toString();
    // this.items.unshift(item);
    // return of(this.items.slice()).pipe(delay(1000));
    let url: string = this.appConstantService.APP_DOMAIN + "api/Dealer/Post";
    return this.http.post<DealerApiModel[]>(url, item);
  }
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
  removeItem(row: DealerApiModel) {

    // let i = this.items.indexOf(row);
    // this.items.splice(i, 1);
    // return of(this.items.slice()).pipe(delay(1000));
    let url: string = this.appConstantService.APP_DOMAIN + "api/Dealer/Delete/" + row.DealerGuid;
    return this.http.delete<DealerApiModel[]>(url);
  }

  canRemoveItem(row: DealerApiModel) {

    // let i = this.items.indexOf(row);
    // this.items.splice(i, 1);
    // return of(this.items.slice()).pipe(delay(1000));
    let url: string = this.appConstantService.APP_DOMAIN + "api/Dealer/CanDelete/" + row.DealerGuid;
    return this.http.get<boolean>(url);
  }


  getFinancials(): Observable<FinancialApiModel[]> {
    // return  of(this.items.slice())
    let url: string = this.appConstantService.APP_DOMAIN + "api/Financial/Get";
    return this.http.get<FinancialApiModel[]>(url);
  }
  updateFinancial(id, item: FinancialApiModel): Observable<any> {
    let url: string = this.appConstantService.APP_DOMAIN + "api/Financial/Put/" + id;
    return this.http.put<FinancialApiModel[]>(url, item);
  }

}