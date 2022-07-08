import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiListService {

  constructor() { }
  public REGISTER_USER: string = "/register"
  public LOGIN:string ="/login"; 
  public MENU_LIST: string = "/getMenuList"
 


}
