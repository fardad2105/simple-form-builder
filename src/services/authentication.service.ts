import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../data/User';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

constructor(
  private route: Router,
  private http: HttpClient
) {
   this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
   this.user = this.userSubject.asObservable();
 }

 public get userValue(): User {
   return this.userSubject.value;
 }

 login(username: string, password: string) {
   return this.http.post<any>(`${environment.apiUrl}/`,{username, password})
          .pipe(map(user => {
             localStorage.setItem('user', JSON.stringify(user));
             this.userSubject.next(user);
             return user;
          }))
 }

 logout() {
   localStorage.removeItem('user');
   this.userSubject.next(null);
   this.route.navigate(['/login']);
 }


}
