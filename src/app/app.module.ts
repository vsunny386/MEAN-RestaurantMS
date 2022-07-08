import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { CartComponent } from './components/cart/cart.component';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MainComponent } from './components/admin/main/main.component';
import { UsersComponent } from './components/admin/users/users.component';
import { UpdateUsersComponent } from './components/admin/update-users/update-users.component';
import { OrdersComponent } from './components/admin/orders/orders.component';
import { AddMenuComponent } from './components/admin/add-menu/add-menu.component';
import { MenuActionsComponent } from './components/admin/menu-actions/menu-actions.component';
import { UpdateMenuComponent } from './components/admin/update-menu/update-menu.component';
import { ToastrModule } from 'ngx-toastr'
import {MatInputModule} from '@angular/material/input';
import { SuccessMessageComponent } from './components/success-message/success-message.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    MenuComponent,
    LoginComponent,
    RegisterComponent,
    CartComponent,
    MainComponent,
    UsersComponent,
    UpdateUsersComponent,
    OrdersComponent,
    AddMenuComponent,
    MenuActionsComponent,
    UpdateMenuComponent,
    SuccessMessageComponent,
    ErrorMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    MatSidenavModule,
    MatInputModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-center',
      
    }), // ToastrModule added
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, 
    useClass: AuthInterceptor, 
    multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
