import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cart: BehaviorSubject<any>
  public currentCart: Observable<any>
  public cartItems = []
  public cartLength: BehaviorSubject<any>
  constructor() {
    this.cart = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('cart')));
    this.cartLength = new BehaviorSubject<any>(0)
    this.currentCart = this.cart.asObservable()
 this.cartItems = (JSON.parse(localStorage.getItem('cart')))
  
  }
  public get currentUserValue(): any {
    return this.cart.value;


  }


  updateCart(data) {
    // this.cart.next(data)

    this.cartItems.push(data)

    this.cartItems = this.cartItems.filter((value, index, self) =>
      index === self.findIndex((t) => (
        t.place === value.place && t.name === value.name
      ))
    )    
    this.cartLength.next(this.cartItems.length)
    this.cart.next(this.cartItems)
       localStorage.setItem('cart', JSON.stringify(this.cartItems))  

    // localStorage.setItem('cart', JSON.stringify(this.cartItems));
    //  this.cartItems = this.cartItems.filter(function (el) {
    //   return el != null;
    // });


  }

  removeCartItem(data){
    
    let index = this.cartItems.indexOf(data)
    if (index > -1) {
     this.cartItems.splice(index, 1);
   }
   console.log(this.cartItems);
   
   this.cart.next(this.cartItems)
   localStorage.setItem('cart', JSON.stringify(this.cartItems))  

   
  }
  public get currentCartofItems(): any {
    return this.cartItems


  }

}
