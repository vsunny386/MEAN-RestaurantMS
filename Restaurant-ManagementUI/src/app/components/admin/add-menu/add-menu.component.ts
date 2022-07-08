import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css']
})
export class AddMenuComponent implements OnInit {
  addMenuForm: FormGroup
  selectedImage
  constructor(
    private adminService: AdminService,
    private formbuilder: FormBuilder,
    private activateRouter: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.addMenuForm = this.formbuilder.group({
      name: new FormControl(''),
      description: new FormControl(''),
      price: new FormControl(''),
      image: new FormControl(''),
      })
    }
  ngOnInit(): void {
  
    
  }

  uploadImage(event){
    
    this.selectedImage = event.target.files[0]
    console.log(this.selectedImage);
    
  }
  

  addMenu(){
   const fd = new FormData();
   fd.append('name' , this.addMenuForm.controls.name.value)
   fd.append('description' , this.addMenuForm.controls.description.value)
   fd.append('price' , this.addMenuForm.controls.price.value)
   fd.append('file' , this.selectedImage, this.selectedImage.name)
  
   this.adminService.addMenu(fd).subscribe(
    (res)=>{
      console.log(res);
      this.toastr.success("Menu Added Successfully")
    }
   )
   
    

  }

}
