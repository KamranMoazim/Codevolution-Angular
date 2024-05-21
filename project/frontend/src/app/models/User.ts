import { Role } from "../enums/role";


export class User {

  public role: Role;

  constructor(
      public name: string,
      public email: string,
      public avatar: string,
      role: string
  ) {
    if (role === 'admin') {
      this.role = Role.ADMIN;
    } else {
      this.role = Role.USER;
    }
  }
}
