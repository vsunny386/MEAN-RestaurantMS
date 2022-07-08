import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Checkout } from 'src/app/models/checkout';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { CheckoutService } from 'src/app/services/checkout/checkout.service';
import { environment } from 'src/environments/environment';

declare var Stripe: any;
declare var Razorpay:any


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  server_url = `${environment.baseUrl}/static`
  cartItems: any = []
  cartLength: number
  subTotal:any
  totalPrice:any
  totalPriceArray = []
  deliveryCharge 
  deliveryTaxes
  userName: string
userAddress: string
userContact: number
 userDetails: FormGroup
success
razorPayData
sigObj
isloggedIn: boolean
paidBy
  constructor(
    private cart: CartService,
    private auth: AuthService,
    private checkouts: CheckoutService,
    private router: Router
  ) {
    if (localStorage.getItem("currentUser") !== null) {
      this.isloggedIn = true
    }

  }

  ngOnInit(): void {
   

  
    this.auth.currentUser.subscribe(
      (res)=>{
        this.userName = res['username']
        
      }
    )
    this.cart.cart.subscribe(
      (res) => {
      
       
        this.cartItems = res
        this.cartItems = [...new Set(this.cartItems)];
        this.subTotal = this.cartItems.reduce((acc,curVal) => {
          return acc + (curVal.price * curVal.quantity); 
           //this.temp.push( curVal.amount * curVal.quantity);
        },0)
       
        this.deliveryTaxes = this.subTotal * 0.05;
        (Math.round(this.deliveryTaxes * 100) / 100).toFixed(2);

       

        this.totalPrice = this.subTotal + this.deliveryTaxes
      }
      
    )

  
  }

 


  increment(item) {
  
    item.quantity++
    this.subTotal = this.cartItems.reduce((acc,curVal) => {
      return acc + (curVal.price * curVal.quantity); 
       //this.temp.push( curVal.amount * curVal.quantity);
    },0)
    console.log(this.totalPrice);
    this.deliveryTaxes = this.subTotal * 0.05;
    (Math.round(this.deliveryTaxes * 100) / 100).toFixed(2);
    this.deliveryTaxes.toFixed(2);
        this.totalPrice = this.subTotal + this.deliveryTaxes
  }
  decrement(item) {
    item.quantity--

    if (item.quantity < 1) {
      item.quantity = 1
    }
    this.subTotal = this.cartItems.reduce((acc,curVal) => {
      return acc + (curVal.price * curVal.quantity); 
       //this.temp.push( curVal.amount * curVal.quantity);
    },0)
    this.deliveryTaxes = this.subTotal * 0.05;
    (Math.round(this.deliveryTaxes * 100) / 100).toFixed(2);
    this.deliveryTaxes.toFixed(2);
    this.totalPrice = this.subTotal + this.deliveryTaxes
  }

removeItem(value){
 this.cart.removeCartItem(value)
}  

 

//////////////////////////RAZORPAY//////////////////////
razorPayOptions={
  "key":"",
  "amount": "",
  "currency":"INR",
  "name":"",
  "description":"Order Description",
  "order_id": "",
  "handler": (res)=>{
    this.checkouts.verifySignature(res).subscribe(
      (res)=>{
        console.log(res);
        
      }
    )
    let order = new Checkout()
    order.id = this.auth.currentUserSubject.value.id
    order.cartItems = this.cart.cart.value
    order.address = this.userAddress
    order.amount = this.totalPrice
    order.contact = this.userContact
    order.name = this.userName
    order.email = this.auth.currentUserSubject.value.emailID
    order.mode_of_payment = this.paidBy
   console.log(order);
   this.checkouts.placeOrder(order).subscribe(
    (res)=>{
    
        this.router.navigate(['/success']);
    

      console.log(res);
      console.log("Order Placed");
      this.success = true
     
      
    }
    
  )
    console.log(res);

  }
}
razorPayResponseHandler(res:any){
  this.sigObj = res
  console.log(res);
   
  }


buyRazorPay(formData){
 this.razorPayData = formData
 this.razorPayData.amount = this.totalPrice
 console.log(this.razorPayData);
 
 this.checkouts.makePayment(this.razorPayData).subscribe(
  (res)=>{
    this.razorPayOptions.key = res['key']
    this.razorPayOptions.amount = this.razorPayData.amount
    this.razorPayOptions.name =this.userName
    this.razorPayData.order_id = res['value']['id']
    
    const rzp1 = new Razorpay(this.razorPayOptions)
    rzp1.open();
  
    console.log('opened');

  
    
  })
 
} 







getUserInfo(item){
  this.userAddress = item.address
  this.userContact = item.mobile
  this.paidBy = item.paymentMode
  console.log(item);
  if (item.paymentMode == "cod") {
   
    let order = new Checkout()
    order.id = this.auth.currentUserSubject.value.id
    order.cartItems = this.cart.cart.value
    order.address = item.address
    order.amount = this.totalPrice
    order.contact = item.mobile
    order.name = this.userName
    order.email = this.auth.currentUserSubject.value.emailID
    order.mode_of_payment = item.paymentMode
   console.log(order);
   

    this.checkouts.placeOrder(order).subscribe(
      (res)=>{
        console.log(res);
        console.log("Order Placed");
        this.success = true
        this.router.navigate(['/success'])
      }
    )
  }
 
  
  if(item.paymentMode == "online"){
    
    this.buyRazorPay(this.razorPayOptions)
   

  }
  
}
}



