import { UserRole } from "@/utils/roles";

// Core user info
export interface IUser {
  _id: string;
  email: string;
  name: string;
  role: UserRole;
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
  role?: UserRole;
}

export interface IUpdateUserDTO {
  name?: string;
  phone?: string;
  address?: string;
  role?: UserRole;
  isActive?: boolean;
}

// interface cho địa chỉ người dùng
export interface IUserAddress {
  provinceCode: number;
  provinceName: string;
  wardCode: number;
  wardName: string;
  detail: string;
}

// interface cho profile user
export interface IProfileUser {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  address?: IUserAddress;
}

export interface IUpdateProfileDTO {
  name?: string;
  phone?: string;
  address?: IUserAddress;
}