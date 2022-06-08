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
  getItems(): Observable<FabricatorApiModel[]> {
    // return  of(this.items.slice())
    let url: string = this.appConstantService.APP_DOMAIN + "api/Fabricator/Get";
    return this.http.get<FabricatorApiModel[]>(url);
  }
  addItem(item: FabricatorApiModel): Observable<any> {
    // item._id = Math.round(Math.random() * 10000000000).toString();
    // this.items.unshift(item);
    // return of(this.items.slice()).pipe(delay(1000));
    let url: string = this.appConstantService.APP_DOMAIN + "api/Fabricator/Post";
    return this.http.post<FabricatorApiModel[]>(url, item);
  }
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
  validateUpdate(id, item: FabricatorApiModel): Observable<any> {
    let url: string = this.appConstantService.APP_DOMAIN + "api/Fabricator/ValidateUpdate/" + id;
    return this.http.put<FabricatorApiModel[]>(url, item);
  }

  removeItem(row: FabricatorApiModel) {

    // let i = this.items.indexOf(row);
    // this.items.splice(i, 1);
    // return of(this.items.slice()).pipe(delay(1000));
    let url: string = this.appConstantService.APP_DOMAIN + "api/Fabricator/Delete/" + row.FabricatorGuid;
    return this.http.delete<FabricatorApiModel[]>(url);
  }

  canRemoveItem(row: FabricatorApiModel) {

    // let i = this.items.indexOf(row);
    // this.items.splice(i, 1);
    // return of(this.items.slice()).pipe(delay(1000));
    let url: string = this.appConstantService.APP_DOMAIN + "api/Fabricator/CanDelete/" + row.FabricatorGuid;
    return this.http.get<boolean>(url);
  }
}
