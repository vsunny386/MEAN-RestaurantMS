import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-update-menu',
  templateUrl: './update-menu.component.html',
  styleUrls: ['./update-menu.component.css']
})
export class UpdateMenuComponent implements OnInit {
updateMenuForm: FormGroup
selectedImage
getId
  constructor(
    private adminService: AdminService,
    private formbuilder: FormBuilder,
    private activatedRouter: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getId = (this.activatedRouter.snapshot.params['id'])
    this.adminService.getMenuListById(this.getId).subscribe(
      (res)=>{
       
        
        this.updateMenuForm = this.formbuilder.group({
          name: new FormControl(res['name']),
          description: new FormControl(res['description']),
          price: new FormControl(res['price']),
          image: new FormControl(''),
         
         
        })
      }
    )
  }
  uploadImage(event){
    
    this.selectedImage = event.target.files[0]
    console.log(this.selectedImage);
    
  }
  

  updateMenu(){
   const fd = new FormData();
   fd.append('name' , this.updateMenuForm.controls.name.value)
   fd.append('description' , this.updateMenuForm.controls.description.value)
   fd.append('price' , this.updateMenuForm.controls.price.value)
   fd.append('file' , this.selectedImage, this.selectedImage.name)
   this.adminService.updateMenuItem(this.getId,fd).subscribe(
    (res)=>{
      console.log(res);
      this.toastr.success("Menu Updated")
    }
   
   )
    

  }

}
