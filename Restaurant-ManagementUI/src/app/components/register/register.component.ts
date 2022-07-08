import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Register } from 'src/app/models/register';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
    cpassword: new FormControl('',[Validators.required]),
  });
  constructor(
    private auth:AuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    
  }


  submit(){
   let register = new Register()
   register.name = this.registrationForm.controls['name'].value
   register.email = this.registrationForm.controls['email'].value
   register.password = this.registrationForm.controls['password'].value
   register.cpassword = this.registrationForm.controls['cpassword'].value

   console.log(register);
   this.auth.register(register).subscribe(
    (res)=>{
      console.log(res);
      this.toastr.success("User Registered Successfully")
    },
  (err)=>{
      this.toastr.error("Error in User Registration, please enter correct data and try again")
    }
   )
   
  }
 
  
  

}
