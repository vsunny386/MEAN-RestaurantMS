import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin/admin.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-menu-actions',
  templateUrl: './menu-actions.component.html',
  styleUrls: ['./menu-actions.component.css']
})
export class MenuActionsComponent implements OnInit {
  server_url = `${environment.baseUrl}/static`
menuList:any = []
  constructor(
    private adminService: AdminService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.adminService.getMenuList().subscribe(
      (res)=>{
        console.log(res);
        this.menuList = res
      }
    )
  }

  delete(item){
    console.log(item._id)
   let index = this.menuList.indexOf(item)
    this.menuList.splice(index,1)
   this.adminService.deleteMenuItem(item._id).subscribe(
     (res)=>{
       console.log(res)
       this.toastr.success("Menu Deleted")
     }
   )
  }

}
