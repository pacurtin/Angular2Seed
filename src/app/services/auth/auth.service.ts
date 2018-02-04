import {Injectable} from '@angular/core';

/* Low level functions for manipulating a authtoken item in browsers local storage */

@Injectable()
export class AuthService {

  constructor() { }

  // TODO Heads up. This isn't currently being used in rest-client.ts. Duplication is bad.
  static getToken(): string {
    // checks sessionStorage first then localstorage
    // making it static so I can access it in rest-client.ts
    return sessionStorage.getItem('authtoken') || localStorage.getItem('authtoken');
  }

  setToken(token, keepLoggedIn): void {
    // Deleted when user closes browser
    sessionStorage.setItem('authtoken', token);
    if (keepLoggedIn) {
      // persists even after browser closes
      localStorage.setItem('authtoken', token);
    }
  }

  isLoggedIn() {
    return AuthService.getToken() !== null;
  }

  logout(): void {
    localStorage.removeItem('authtoken');
    sessionStorage.removeItem('authtoken');
  }

}
