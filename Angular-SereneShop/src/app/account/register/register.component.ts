import { Component } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { finalize, map } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  passwordPattern = /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/;
  phoneNumberPattern = /^01[125][0-9]{8}/;
  errors: string[] | null = null;

  constructor(private _FormBuilder:FormBuilder, private _AccountService:AccountService, private _Router:Router){}


  registerForm = this._FormBuilder.group({
    displayName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email], [this.validateEmailNotTaken()]],
    password: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],
    phoneNumber : ['', [Validators.required, Validators.pattern(this.phoneNumberPattern)]]
  })

  onSubmit(){
    if(this.registerForm.valid){
      this._AccountService.register(this.registerForm.value).subscribe({
        next: () => {
          this._Router.navigateByUrl('/shop');
        },
        error: (err) => {
          this.errors = err.errors;
        }
      });
    }
  }

  validateEmailNotTaken():AsyncValidatorFn{
    return (control: AbstractControl) => {
      console.log(control);
      return this._AccountService.checkEmailExists(control.value).pipe(
        map(result => result ? {emailExists: true} : null),
        finalize(() => control.markAsTouched())
      )
    }
  }

}
