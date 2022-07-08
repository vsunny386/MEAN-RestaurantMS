import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { RegisterComponent } from './components/register/register.component';
import { SuccessMessageComponent } from './components/success-message/success-message.component';

const routes: Routes = [
  {path:'',  component: HomeComponent},
  {path:'menu',component: MenuComponent},
  {path:'login',component: LoginComponent},
  {path:'register',component: RegisterComponent},
  {path:'cart',component: CartComponent},
  {path:'success',component: SuccessMessageComponent, pathMatch: 'full'},
  {path:'error',component: ErrorMessageComponent, pathMatch: 'full'},
  {path: 'admin', loadChildren:()=>import('./components/admin/admin/admin.module').then((m)=>m.AdminModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
