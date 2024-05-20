import { Injectable } from '@angular/core';
import { Role } from '../../enums/role';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getUserRole(): Role {
    /**
    * fake an API call
    */
    // return Role.USER;
    return Role.ADMIN;
  }
}
