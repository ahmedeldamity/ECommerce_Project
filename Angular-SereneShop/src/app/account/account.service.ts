import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, map } from 'rxjs';
import { Address, User } from '../shared/interfaces/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private _HttpClient:HttpClient, private _Router:Router) { }
  baseUrl = environment.apiUrl;

  private currentUserSourse = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSourse.asObservable();

  loadCurrentUser(token:string){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    return this._HttpClient.get<User>(this.baseUrl + 'account', {headers}).pipe(
      map(user => {
        localStorage.setItem('token', user.token);
        this.currentUserSourse.next(user);
      })
    );
  }

  login(values:any){
    return this._HttpClient.post<User>(this.baseUrl + 'account/login', values).pipe(
      map(user => {
        localStorage.setItem('token', user.token);
        this.currentUserSourse.next(user);
      })
    );
  }

  register(values:any){
    return this._HttpClient.post<User>(this.baseUrl + 'account/register', values).pipe(
      map(user => {
        localStorage.setItem('token', user.token);
        this.currentUserSourse.next(user);
      })
    );
  }

  logout(){
    localStorage.removeItem('token');
    this.currentUserSourse.next(null);
    this._Router.navigateByUrl('/');
  }

  checkEmailExists(email:string){
    return this._HttpClient.get<boolean>(this.baseUrl + 'account/emailexists?email=' + email);
  }

  getUserAddress(){
    return this._HttpClient.get<Address>(this.baseUrl + 'account/address');
  }

  updateUserAddress(address: Address){
    return this._HttpClient.put(this.baseUrl + 'account/address', address);
  }

}
