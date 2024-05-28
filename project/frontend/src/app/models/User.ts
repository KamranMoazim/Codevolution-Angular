import { Role } from "../enums/role";


export class User {

  public role: Role;
  public profile?: Profile = null;

  constructor(
      public name: string,
      public email: string,
      role: string
  ) {
    if (role === 'admin') {
      this.role = Role.ADMIN;
    } else {
      this.role = Role.USER;
    }
  }
}

export class Profile {

  public followers?: User[] = [];

  constructor(
      public avatar: string,
      public bio: string,
  ) {}
}
