import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart/cart.service';
import { MenuService } from 'src/app/services/menu/menu.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
menuList:any = []
server_url = `${environment.baseUrl}/static`

  constructor(
    private menu: MenuService,
    private cart: CartService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.menu.getMenuList().subscribe(
      (res)=>{
        this.menuList = res
       
      }
    )
    console.log(this.cart.cart.value);
  }

  addtoCart(id){
    this.cart.updateCart(id)
    this.toastr.info(`${id.name} Added to Cart`)
 
   
    
  }


}
