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
  getItems(): Observable<OrderApiModel[]> {
    let url: string = this.appConstantService.APP_DOMAIN + "api/Order/Get";
    return this.http.get<OrderApiModel[]>(url);
  }
  getCompleteList(): Observable<OrderApiModel[]> {
    let url: string = this.appConstantService.APP_DOMAIN + "api/Order/GetCompleteList";
    return this.http.get<OrderApiModel[]>(url);
  }

  updateItem(id, item: OrderApiModel): Observable<any> {
    let url: string = this.appConstantService.APP_DOMAIN + "api/Order/Put/" + id;
    return this.http.put<OrderApiModel[]>(url, item);
  }

  sendMailsforOrder(id, statusid, projectId, productId): Observable<boolean> {
    let url: string = this.appConstantService.APP_DOMAIN + "api/Order/SendMail/" + id + "/" + statusid + "/" + projectId + "/" + productId;
    return this.http.get<boolean>(url);
  }

  // updateItemById(id, item: OrderApiModel): Observable<any> {
  //   let url: string = this.appConstantService.APP_DOMAIN + "api/Order/UpdateOrderById/" + id;
  //   return this.http.post<OrderApiModel[]>(url, item);
  // }
  
  deleteOrderById(row: OrderApiModel) {
    let url: string = this.appConstantService.APP_DOMAIN + "api/BpsProject/DeleteOrderById/" + row.OrderDetails[0].ProductId;
    return this.http.delete<OrderApiModel[]>(url);
  }

  CancelAllProjectOrders(ProjectId: number): Observable<number> {
    let url: string = this.appConstantService.APP_DOMAIN + "api/BpsProject/CancelAllProjectOrders/" + ProjectId;
    return this.http.get<number>(url);
  }
  removeItem(row: OrderApiModel) {

    // let i = this.items.indexOf(row);
    // this.items.splice(i, 1);
    // return of(this.items.slice()).pipe(delay(1000));
    let url: string = this.appConstantService.APP_DOMAIN + "api/Order/Delete/" + row.OrderExternalId;
    return this.http.delete<OrderApiModel[]>(url);
  }

  getItemsForOrderDashboard(getType: string): Observable<number[]> {
    // return  of(this.items.slice())
    let url: string = this.appConstantService.APP_DOMAIN + "api/Order/GetOrderDashboard/" + getType;
    return this.http.get<number[]>(url);
  }

  DownloadDesignDocument(orderDetailsId: string): Observable<any> {
    return this.http.get(this.appConstantService.APP_DOMAIN + 'api/order/GetPresignedURL/' + orderDetailsId);
  }
  DownloadBomDocument(orderDetailsId: string): Observable<any> {
    return this.http.get(this.appConstantService.APP_DOMAIN + 'api/order/GetPresignedExcelURL/' + orderDetailsId);
  }
  GetProposalFile(problemGuid: string, proposalOrBOM: string): Observable<any> {
    return this.http.get(this.appConstantService.APP_DOMAIN + "api/Order/GenerateProposalFile/" + problemGuid + "/" + proposalOrBOM, {
      responseType: 'blob'
    });
  }

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
