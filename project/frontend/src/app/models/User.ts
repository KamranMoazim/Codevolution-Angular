import { Role } from "../enums/role";


export class User {

  public _id?: string = '';
  public role: Role | string = Role.USER;
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

export class Organization extends User {
  constructor(
      public averageRating: number,
      public totalEvents: number,
      name: string,
      email: string,
      role: string
  ) {
    super(name, email, role);
  }
}

export class Profile {
  constructor() {}
}



export class AllOrgRequest {
  constructor(
    public search?: string,
    public page?: number,
    public limit?: number,
  ) {}
}

export class AllOrgResponse {
  constructor(
    public data: {
      organizations: Organization[],
      total: number
    }
  ) {}
}


export class UserProfileResponse {
  constructor(
    public data: User
  ) {}
}

export class UpdateProfileRequest {
  constructor(
    public name: string,
    public bio: string,
    public avatar: string
  ) {}
}

export class GetProfileResponse {
  constructor(
    public data: {
      profile: User
    }
  ) {}
}
