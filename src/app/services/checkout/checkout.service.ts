import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
SERVER_URL = environment.baseUrl
  constructor(private http: HttpClient) { }

  makePayment(formData){
    return this.http.post(`${this.SERVER_URL}/payment`, formData)
  }

  verifySignature(data:any){
    return this.http.post(`${this.SERVER_URL}/api/payment/verify`, data)
  }

  placeOrder(data){
    return this.http.post(`${this.SERVER_URL}/order`, data)
  }
}
