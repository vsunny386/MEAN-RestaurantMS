import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { Login } from 'src/app/models/login';
import { Register } from 'src/app/models/register';
import { environment } from 'src/environments/environment';
import { ApiListService } from '../api-list/api-list.service';
import { CartService } from '../cart/cart.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isloggedIn = false
SERVER_URL = environment.baseUrl
currentUserSubject

currentUser
  constructor(
    private http: HttpClient,
    private apiList: ApiListService,
    private router:Router,
    private cart: CartService
  ) { 
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(){
    return this.currentUserSubject.value;
  }

   register(register:Register){
    return this.http.post(`${this.SERVER_URL}` + this.apiList.REGISTER_USER, register )
   } 

   login(login:Login){
    return this.http.post(`${this.SERVER_URL}` + this.apiList.LOGIN, login ) .pipe(map(user =>{
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      console.log(this.currentUserValue);
      this.isloggedIn = true
      console.log(this.currentUserValue.username );
      
   
      
      if (this.currentUserValue.username == 'admin') {
        this.router.navigate(['/admin/orders'])
       }
     if (this.currentUserValue.username !== 'admin') {
      this.router.navigate(['/'])
     }
     
      return user 
    }))

   } 

   logout(){
    localStorage.removeItem('currentUser');
    // localStorage.removeItem('cart');
    this.currentUserSubject.next(null)
    this.cart.cart.next(JSON.parse(localStorage.getItem('cart')))
    this.router.navigate(['/']) 
  }

}
