import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from 'src/app/guards/role.guard';
import { Roles } from 'src/app/models/roles';
import { AddMenuComponent } from '../add-menu/add-menu.component';
import { MainComponent } from '../main/main.component';
import { MenuActionsComponent } from '../menu-actions/menu-actions.component';
import { OrdersComponent } from '../orders/orders.component';
import { UpdateMenuComponent } from '../update-menu/update-menu.component';
import { UpdateUsersComponent } from '../update-users/update-users.component';
import { UsersComponent } from '../users/users.component';

const routes: Routes = [
  
  {path: 'main', component: MainComponent,
  canActivate: [RoleGuard],
  data: {roles: [Roles.admin]}
},
{path: 'update/:id', component: UpdateUsersComponent,
  canActivate: [RoleGuard],
  data: {roles: [Roles.admin]}
},
{path: 'users', component: UsersComponent,
  canActivate: [RoleGuard],
  data: {roles: [Roles.admin]}
},
{path: 'orders', component: OrdersComponent,
  canActivate: [RoleGuard],
  data: {roles: [Roles.admin]}
},
{path: 'add-menu', component: AddMenuComponent,
  canActivate: [RoleGuard],
  data: {roles: [Roles.admin]}
},
{path: 'menu-actions', component: MenuActionsComponent,
  canActivate: [RoleGuard],
  data: {roles: [Roles.admin]}
},

{path: 'update/menu/:id', component: UpdateMenuComponent,
  canActivate: [RoleGuard],
  data: {roles: [Roles.admin]}
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
