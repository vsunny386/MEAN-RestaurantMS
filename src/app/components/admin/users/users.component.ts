import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
users:any = []
userList:any = [];
  constructor(
    private adminService: AdminService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.adminService.getUsers().subscribe(
      (res)=>{
        this.users = res
        console.log(res);
        
      }
    )
  }

  delete(item){
    console.log(item._id)
   let index = this.users.indexOf(item)
    this.users.splice(index,1)
   this.adminService.deleteUser(item._id).subscribe(
     (res)=>{
       console.log(res)
       this.toastr.success("User Deleted")
     }
   )
  }

}
