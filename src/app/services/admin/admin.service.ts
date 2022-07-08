import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
SERVER_URL = environment.baseUrl

  constructor(
    private http: HttpClient
  ) { }

getUsers(){
  return this.http.get(`${this.SERVER_URL}/users`)
}

getUsersById(id){
  return this.http.get(`${this.SERVER_URL}/users/${id}`)
}

updateUser(id,data){
  return this.http.put(`${this.SERVER_URL}/update/${id}`, data)
}

deleteUser(id){
  return this.http.delete(`${this.SERVER_URL}/delete/${id}`)
}

getOrderList(){
  return this.http.get(`${this.SERVER_URL}/customer/orderList`)
}

updateOrderList(id,data){
  return this.http.put(`${this.SERVER_URL}/update/order/${id}`,data)
}

deleteOrder(id){
  return this.http.delete(`${this.SERVER_URL}/order/delete/${id}`)
}

addMenu(data){
  return this.http.post(`${this.SERVER_URL}/addMenu`,data)
}

getMenuList(){
  return this.http.get(`${this.SERVER_URL}/getMenuList`)
}

getMenuListById(id){
  return this.http.get(`${this.SERVER_URL}/menus/${id}`)
}

updateMenuItem(id,data){
  return this.http.put(`${this.SERVER_URL}/updateMenu/${id}`,data)
}

deleteMenuItem(id){
  return this.http.delete(`${this.SERVER_URL}/order/menu/${id}`)
}
}
