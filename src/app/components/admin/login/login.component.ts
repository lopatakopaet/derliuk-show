import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, NgForm} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {AuthService} from "../../../services/auth.service";
import {ApiService} from "../../../services/api.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  invalidCredentialMsg: string = '';
  username:string = '';
  password:string = '';
  retUrl:string | null = "home";

  constructor(private authService: AuthService,
              private apiService: ApiService,
              private router: Router,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap
      .subscribe(params => {
        this.retUrl = params.get('retUrl');
        console.log( 'LoginComponent/ngOnInit '+ this.retUrl);
      });
  }
  onFormSubmit(loginForm: NgForm) {
    this.authService.login(loginForm.value.username, loginForm.value.password).subscribe({
      next: (v) => {
        // v - это флаг на авторизирован пользователь или нет
        console.log( 'return to '+ this.retUrl);
        console.log( 've'+ v.hash);
        if (v.hash) {
          this.authService.loginUser();
          this.authService.setHas(v.hash)
          if (this.retUrl!=null) {
            console.log( 'this.router.navigaten to '+ this.retUrl);
            // this.router.navigate( ['home']);
            this.router.navigate([this.retUrl]) ;
          } else {
            this.router.navigate( ['admin']);
          }
        }
      },
      error: (e) => {
        this.authService.logoutUser();
        console.log('navigate error', e)
      },
      complete: () => {}
    });
  }
}
