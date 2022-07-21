import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { OrderApiModel } from 'app/shared/models/OrderApiModel'
import { delay } from 'rxjs/operators';
import { AppconstantsService } from 'app/shared/services/appconstants.service';

@Injectable()
export class OrderService {
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
 * This function is to get the list of orders from API call.
 * 
 * @returns {OrderApiModel} returns the list of orders from API call.
 * 
 */
  getItems(): Observable<OrderApiModel[]> {
    let url: string = this.appConstantService.APP_DOMAIN + "api/Order/Get";
    return this.http.get<OrderApiModel[]>(url);
  }

 /**
 * This function is to get the list of complete orders from API call.
 * 
 * @returns {OrderApiModel} returns the list of complete orders from API call.
 * 
 */
  getCompleteList(): Observable<OrderApiModel[]> {
    let url: string = this.appConstantService.APP_DOMAIN + "api/Order/GetCompleteList";
    return this.http.get<OrderApiModel[]>(url);
  }

 /**
 * This function calls the api to update the order and will get the updated orders list .
 * 
 * @param {OrderApiModel} item is the order object which needs to be updated and it passed as input parameter throuh api call
 * 
 * @param {any} id the id of the selected order by which order details will be updated.
 * 
 * @returns {any} returns the orders list with the updated order from API call.
 * 
 */
  updateItem(id, item: OrderApiModel): Observable<any> {
    let url: string = this.appConstantService.APP_DOMAIN + "api/Order/Put/" + id;
    return this.http.put<OrderApiModel[]>(url, item);
  }

 /**
 * This function calls the api to send the email notifications for admins, dealers and fabricators
 * 
 * @param {any} id is the order id for which the email notifications has to send through api call
 * 
 * @param {any} statusid the id of the status for which the email notifications has to send.
 * 
 * @param {any} projectId the id of the project for which the email notifications has to send.
 * 
 * @param {any} productid the id of the product for which the email notifications has to send.
 * 
 * @returns {any} returns the api call status ok or not.
 * 
 */
  sendMailsforOrder(id, statusid, projectId, productId): Observable<boolean> {
    let url: string = this.appConstantService.APP_DOMAIN + "api/Order/SendMail/" + id + "/" + statusid + "/" + projectId + "/" + productId;
    return this.http.get<boolean>(url);
  }

  // updateItemById(id, item: OrderApiModel): Observable<any> {
  //   let url: string = this.appConstantService.APP_DOMAIN + "api/Order/UpdateOrderById/" + id;
  //   return this.http.post<OrderApiModel[]>(url, item);
  // }
 
 /**
 * This function calls the api to remove the order and will get the updated orders list .
 * 
 * @param {OrderApiModel} row is the order object which needs to be deleted and it passed as input parameter through api call.
 * 
 * @returns {any} returns the orders list with the updated list from API call.
 * 
 */ 
  deleteOrderById(row: OrderApiModel) {
    let url: string = this.appConstantService.APP_DOMAIN + "api/BpsProject/DeleteOrderById/" + row.OrderDetails[0].ProductId;
    return this.http.delete<OrderApiModel[]>(url);
  }

 /**
 * This function calls the api to cancel all teh orders related to the given ProjectId .
 * 
 * @param {number} ProjectId is the projectId of whih all the orders needs to be cancelled through api call.
 * 
 */ 
  CancelAllProjectOrders(ProjectId: number): Observable<number> {
    let url: string = this.appConstantService.APP_DOMAIN + "api/BpsProject/CancelAllProjectOrders/" + ProjectId;
    return this.http.get<number>(url);
  }

 /**
 * This function calls the api to remove the order and will get the updated orders list .
 * 
 * @param {OrderApiModel} row is the order object which needs to be deleted and it passed as input parameter through api call.
 * 
 * @returns {any} returns the orders list with the updated list from API call.
 * 
 */
  removeItem(row: OrderApiModel) {

    // let i = this.items.indexOf(row);
    // this.items.splice(i, 1);
    // return of(this.items.slice()).pipe(delay(1000));
    let url: string = this.appConstantService.APP_DOMAIN + "api/Order/Delete/" + row.OrderExternalId;
    return this.http.delete<OrderApiModel[]>(url);
  }

 /**
 * This function calls the api to get teh orders for the dashboard with the given type
 * 
 * @param {string} getType is the type of which all the orders will be returned
 * 
 * @returns {number[]} returns list of order numbers of the given type.
 * 
 */
  getItemsForOrderDashboard(getType: string): Observable<number[]> {
    // return  of(this.items.slice())
    let url: string = this.appConstantService.APP_DOMAIN + "api/Order/GetOrderDashboard/" + getType;
    return this.http.get<number[]>(url);
  }

 /**
 * This function calls the api to download the design document of given order Id
 * 
 * @param {string} orderDetailsId is the Order Id of which the design document has to be downloaded
 * 
 */
  DownloadDesignDocument(orderDetailsId: string): Observable<any> {
    return this.http.get(this.appConstantService.APP_DOMAIN + 'api/order/GetPresignedURL/' + orderDetailsId);
  }

 /**
 * This function calls the api to download the Bom document of given order Id
 * 
 * @param {string} orderDetailsId is the Order Id of which the Bom document has to be downloaded
 * 
 */
  DownloadBomDocument(orderDetailsId: string): Observable<any> {
    return this.http.get(this.appConstantService.APP_DOMAIN + 'api/order/GetPresignedExcelURL/' + orderDetailsId);
  }

 /**
 * This function calls the api to get the proposal file for the given problem and Proposal
 * 
 * @param {string} problemGuid is the Problem Guid of which the proposal file will be extracted.
 * 
 * @param {string} proposalOrBOM is the proposal or Bom of which the proposal file will be extracted.
 */
  GetProposalFile(problemGuid: string, proposalOrBOM: string): Observable<any> {
    return this.http.get(this.appConstantService.APP_DOMAIN + "api/Order/GenerateProposalFile/" + problemGuid + "/" + proposalOrBOM, {
      responseType: 'blob'
    });
  }

 /**
 * This function is used to get the Order process status list.
 * 
 * @param {string} status is the input status 
 * 
 *  @returns {string} returns the processed status.
 */
  getProcessStatus(status: string): string {
    switch (status) {
      case "Order_Placed": return "Pending"; break;
      case "In_Pre_Production": return "In Process"; break;
      case "In_Fabrication": return "In Process"; break;
      case "In_Assembly": return "In Process"; break;
      case "Shipped": return "In Process"; break;
      case "Delivered": return "Completed"; break;
      // case "Completed": return "Completed"; break;
      // case "Cancelled": return "Cancelled"; break;
      default: return ""; break;
    }
  }
}
