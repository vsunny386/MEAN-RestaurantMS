import { Component, OnInit, TemplateRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin/admin.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
orderList:any = []
cartInOrder:any = []
stringyFy
JSON
isPaid: boolean = false
server_url = `${environment.baseUrl}/static`
delivered:boolean = false
  constructor(
    private adminService: AdminService,
    private toastr: ToastrService
  ) { 
   
  }
  toArray(answers: object) {
    return Object.keys(answers).map(key => ({
      key,
      ...answers[key]
    }))
  }
  ngOnInit(): void {
    this.adminService.getOrderList().subscribe(
      (res)=>{
       
       
        this.orderList = res
        let array = res
        console.log(this.orderList);
        
        
        this.cartInOrder = array
       
        
        for (let i = 0; i < this.orderList.length; i++) {
         
         
        //  if (this.orderList[i].status) {
        //   console.log(this.orderList[i]);
        //   this.orderList.splice(this.orderList[i],1)
        //  }
          if (this.orderList[i]['paymentMode'] == 'online') {
            this.orderList[i].paid = 'PAID'
            console.log(this.orderList);
            
          }

        }
      }
    )
  }

  acceptOrder(item){
 let   emailObj = {
        email: item.email
    }
    this.adminService.updateOrderList(item._id,emailObj).subscribe(
      (res)=>{
        console.log(res);
       item.status = true
       this.toastr.success("Order Completed")
        
      }
    )}

    deleteOrder(item){
      console.log(item._id)
     let index = this.orderList.indexOf(item)
      this.orderList.splice(index,1)
     this.adminService.deleteOrder(item._id).subscribe(
       (res)=>{
         console.log(res)
       }
     )
    }
}
