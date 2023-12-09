import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/operator/map';
import { of } from 'rxjs';
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root' // ADDED providedIn root here.
})
export class AuthService {

  private isloggedIn: boolean;
  private userName:string = '';
  private hash: string | null = sessionStorage.getItem("hash");

  constructor(private apiService: ApiService,) {
    if (!!this.hash) {
      this.isloggedIn = true;
    } else {
      this.isloggedIn=false;
    }
  }

  getHash() {
    return this.hash;
  }

  setHas(val: string | null) {
    this.hash = val;
    sessionStorage.setItem("hash", val || "");
  }

  // login(username: string, password:string) {
  //   this.isloggedIn=false;
  //   this.apiService.adminLogin({user: username, pass: password}).subscribe({
  //     next: (v) => {
  //       console.log('this.apiService.adminLogin v', v);
  //       this.isloggedIn=true;
  //       return of(this.isloggedIn);
  //       // return of(this.isloggedIn);
  //     },
  //     error: (e) => {
  //       console.log('this.apiService.adminLogin e', e);
  //
  //       },
  //     complete: () => {}
  //   })
  //   //Assuming users are provided the correct credentials.
  //   //In real app you will query the database to verify.
  //
  //   this.userName=username;
  //   return of(this.isloggedIn);
  //
  // }

  login(username: string, password:string) {
    return this.apiService.adminLogin({user: username, pass: password})

  }

  isUserLoggedIn(): boolean {
    return this.isloggedIn;
  }

  isAdminUser():boolean {
    if (this.userName=='Admin') {
      return true;
    }
    return false;
  }

  logoutUser(): void{
    this.isloggedIn = false;
  }

  loginUser(): void {
    this.isloggedIn = true;
  }

}
