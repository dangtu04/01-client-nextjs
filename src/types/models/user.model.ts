// Core user info
export interface IUser {
  _id: string;
  email: string;
  name: string;
  role: string;
}

// User info cho auth/session
export interface IAuthUser extends IUser {
  access_token: string;
}

// Full user info từ API - dùng cho table, không có access_token
export interface IUserTable extends IUser {
  image: string | null;
  accountType: "LOCAL" | "GOOGLE" | "GITHUB";
  isActive: boolean;
  codeId?: string;
  codeExpired?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

// DTOs
export interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export interface IUpdateUserDTO {
  name?: string;
  email?: string;
  role?: string;
  isActive?: boolean;
}
