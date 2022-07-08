import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-update-users',
  templateUrl: './update-users.component.html',
  styleUrls: ['./update-users.component.css']
})
export class UpdateUsersComponent implements OnInit {
  updateForm: FormGroup
  getId
  constructor(
    private adminService: AdminService,
    private formbuilder: FormBuilder,
    private activateRouter: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getId = (this.activateRouter.snapshot.params['id'])
    this.adminService.getUsersById(this.getId).subscribe(
      (res)=>{
        console.log(res);
        
        this.updateForm = this.formbuilder.group({
          name: new FormControl(res['name']),
          email: new FormControl(res['email']),
         
         
        })
      }
    )
   
  }

  updateUser(){
    {
      console.warn("item", this.updateForm.value)
      this.adminService.updateUser(this.getId, this.updateForm.value).subscribe(
        (res)=>{
          console.log(res);
          
         this.toastr.success("User Updated Successfully")
        }
      )
    }
  }

}
