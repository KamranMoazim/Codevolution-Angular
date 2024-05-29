import { BaseResponse } from "./BaseResponse";
import { User } from "./User";


// name, email, password, role
export class RegisterRequest {
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public role: string) {
  }

}

export class RegisterResponse extends BaseResponse {
  // constructor(
  //   public success: boolean,
  //   public message: string
  // ) {
  // }

  constructor(
    success: boolean,
    message: string
  ) {
    super(success, message);
  }
}



// email, password
export class LoginRequest {
  constructor(
    public email: string,
    public password: string) {
  }
}

export class LoginResponse extends BaseResponse {
  // constructor(
  //   // public success: boolean,
  //   // public message: string,
  //   public data: {
  //     accessToken: string,
  //     user: User
  //   }
  // ) {
  // }

  public data:{
    accessToken: string;
    user: User;
  }

  constructor(
    success: boolean,
    message: string,
    accessToken: string,
    user: User
  ) {
    super(success, message);
    // this.accessToken = accessToken;
    // this.user = user;
    this.data = {
      accessToken: accessToken,
      user: user
    }
  }
}




