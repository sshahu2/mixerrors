import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  isDev:any;
  constructor(private http: Http) {
      this.isDev = true;  // Change to false before deployment
      }

  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/users/register', user, {headers: headers})
      .map(res => res.json());
  }
  getAllUser(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
     return this.http.get('http://localhost:8080/users/usersList' ).map(res => res.json());;
      
      
  }

  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/users/authenticate', user, {headers: headers})
      .map(res => res.json());
  }

  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:8080/users/profile', {headers: headers})
      .map(res => res.json());
  }
 geteditable(username){
   return this.http.get('http://localhost:8080/users/'+username)
      .map(res => res.json());
 }
 deleteUser(username){
   return this.http.delete('http://localhost:8080/users/'+username)
      .map(res => res.json());
 }
 updateUser(updatedUser){
   let username=updatedUser.username;
   console.log("chal be "+username);
   return this.http.put('http://localhost:8080/users/'+username,updatedUser)
      .map(res => res.json());
 }
  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
  isadmin() {
    const position = localStorage.getItem('user.position');
    if(position=="admin")
    return true;
    else false;
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
  getData(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
     return this.http.get('http://localhost:8080/traffic/getdb' ).map(res => res.json());
  }
  sendemail(reslt){
       console.log("auth"+reslt);
       return this.http.post('http://localhost:8080/traffic/sendmail',reslt).map(res => res.json());
  }
  pay(charge){
    console.log("charge"+charge);
    return this.http.post('http://localhost:8080/traffic/charge',charge).map(res => res.json());
  }
}