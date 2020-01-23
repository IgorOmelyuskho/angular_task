import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthDto } from 'src/app/models/authDto';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  user$: BehaviorSubject<User> = new BehaviorSubject(null);

  constructor(private http: HttpClient, private router: Router) { }

  init() {
    const userEmail = localStorage.getItem('email');
    if (userEmail) {
      this.getUserByEmail(userEmail).subscribe(
        (user: User) => {
          this.user$.next(user);
        }
      );
    }
  }

  updateUserProfile(oldEmail: string, user: User): Observable<User> {
    const updateUserDto = {
      oldEmail,
      user
    };
    return this.http.put<User>(environment.updateProfile, updateUserDto);
  }

  updatePassword(email: string, password: string) {
    const updateUserDto = {
      email,
      password
    };
    return this.http.put<User>(environment.updatePassword, updateUserDto);
  }

  getUserByEmail(email: string): Observable<User> {
    const params = new HttpParams().set('email', email);
    return this.http.get<User>(environment.auth, { params: params });
  }

  login(authDto: AuthDto): Observable<User> {
    return this.http.post<User>(environment.auth, authDto);
  }

  logout() {
    localStorage.setItem('email', null);
    this.router.navigate(['login']);
  }
}
