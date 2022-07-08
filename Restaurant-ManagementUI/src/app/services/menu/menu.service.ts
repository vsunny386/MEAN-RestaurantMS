import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiListService } from '../api-list/api-list.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
SERVER_URL = environment.baseUrl
  constructor(
    private http:HttpClient,
    private apis: ApiListService
  ) { }

  getMenuList(){
    return this.http.get(`${this.SERVER_URL}${this.apis.MENU_LIST} `)
  }
}
