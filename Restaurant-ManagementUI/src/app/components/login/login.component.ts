import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Login } from 'src/app/models/login';
import { AuthService } from 'src/app/services/Auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
  });
  constructor(
    private auth:AuthService,
    private router:Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  submit(){
    let login = new Login()
   
    login.email = this.loginForm.controls['email'].value
    login.password = this.loginForm.controls['password'].value
  
 
    console.log(login);
    
    this.auth.login(login).subscribe(
     (res)=>{
       console.log(res);
       this.toastr.success("Logged In Successfully")
      
     },
     (err)=>{
     
      this.toastr.error("Invalid Username or Password")
     }
    )
    if (login.email == '' || login.password == '') {
      this.toastr.error("Please Fill complete form")
    }
  }

}
