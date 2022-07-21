import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserDB } from '../../shared/inmemory-db/users';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class CrudService {
  items: any[];
  constructor(
    private http: HttpClient
  ) {
    let userDB = new UserDB();
    this.items = userDB.users;
  }

  //******* Implement your APIs ********

 /**
 * This function is to get the list of items.
 * 
 * @returns {any} returns the list of items.
 */
  getItems(): Observable<any> {
    return of(this.items.slice())
  }

 /**
 * This function is to add the item to the list.
 * 
 * @param {any} item is the object which will be added to the list.
 * 
 * @returns {any} returns the list of items included the newly added one.
 * 
 */
  addItem(item): Observable<any> {
    item._id = Math.round(Math.random() * 10000000000).toString();
    this.items.unshift(item);
    return of(this.items.slice()).pipe(delay(1000));
  }

 /**
 * This function is to update the selected item to the list.
 * 
 * @param {any} item is the selected object to be updated.
 * 
 * @param {any} id is the id of the item by which the item will be updated
 * 
 * @returns {any} returns the list of items with the modified data.
 * 
 */
  updateItem(id, item) {
    this.items = this.items.map(i => {
      if (i._id === id) {
        return Object.assign({}, i, item);
      }
      return i;
    })
    return of(this.items.slice()).pipe(delay(1000));
  }

/**
 * This function is to remove the selected item from the list.
 * 
 * @param {any} row is the selected object to be removed.
 *  
 * @returns {any} returns the list of items with the modified data.
 * 
 */ 
  removeItem(row) {
    let i = this.items.indexOf(row);
    this.items.splice(i, 1);
    return of(this.items.slice()).pipe(delay(1000));
  }
}
