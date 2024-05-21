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

export class RegisterResponse {
  constructor(
    public success: boolean,
    public message: string
  ) {
  }
}



// email, password
export class LoginRequest {
  constructor(
    public email: string,
    public password: string) {
  }
}

export class LoginResponse {
  constructor(
    public success: boolean,
    public message: string,
    public accessToken: string,
    public user: User
  ) {
  }
}




