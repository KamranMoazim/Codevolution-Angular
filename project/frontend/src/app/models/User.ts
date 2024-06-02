import { Role } from "../enums/role";


export class User {

  public id?: string = '';
  public role: Role;
  public followers?: User[] = [];
  public avatar?: string = '';
  public bio?: string = '';
  // public profile?: Profile = null;

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



  constructor(

  ) {}
}
