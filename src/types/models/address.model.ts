export interface IProvince {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  phone_code: number;
  province_code?: number;
  wards?: IProvince[];
}

// Interface cho các loại error response
interface ValidationError {
  loc: string[];
  msg: string;
  type: string;
}

export interface ValidationErrorResponse {
  title: string;
  type: string;
  status: number;
  errors: ValidationError[];
}

export interface ClientServerErrorResponse {
  type: string;
  title: string;
  status: number;
  detail: string;
}