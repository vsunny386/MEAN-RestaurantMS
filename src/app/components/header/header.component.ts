import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
cartItems = []
cartLength: number
isloggedIn:boolean
isUser:boolean  = true
username
isadmin:boolean
  constructor(
    private cart: CartService,
    private auth:AuthService
  ) {
  if (this.auth.currentUserSubject.value != null) {
    this.isloggedIn = true
    this.username = this.auth.currentUserSubject.value.username
    console.log(this.username);
    
  }
  if (this.auth.currentUserSubject.value != null && this.auth.currentUserValue.username == 'admin') {
    this.isUser = false
    this.isadmin = true
   }
 
  
  }

  ngOnInit(): void {
  
 
   

     this.cart.cart.subscribe(
        (res)=>{
          let array = []
          array = res
          this.cartLength = array.length
          console.log(array.length);
      // console.log(res);
      
          // this.cartItems.push(res)
          // this.cartItems = this.cartItems.filter(function (el) {
          //   return el != null;
          // });

          // this.cartLength = this.cartItems.length
          // console.log(this.cartItems);
         
      //  this.cartItems = res
       
        }
      )
   
      // this.cart.cartLength.subscribe(
      //   (res)=>{
      //    if (res == 0) {
      //     res = ""
      //    }
      //     this.cartLength =  res
      //   }
      // )
      
   
  
  }

  logout(){
    this.auth.logout()
 this.isloggedIn =   this.auth.isloggedIn 
  }

}
