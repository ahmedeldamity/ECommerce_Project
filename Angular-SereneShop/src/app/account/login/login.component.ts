import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private _AccountService:AccountService, private _Router:Router){}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  onSubmit(){
    if(this.loginForm.valid){
      this._AccountService.login(this.loginForm.value).subscribe({
        next: () => {
          this._Router.navigateByUrl('/shop');
        }
      });
    }
  }

}
