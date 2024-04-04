export interface Form {
  type: string;
  placeholder: string;
  name: string;
}

export interface FormAttribute extends Form {
  value: string;
}

export enum FormControlSize {
  LG = 'lg',
  SM = 'sm',
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface NewUserInput {
  firstName: string;
  lastName: string;
  bio: string;
  location: string;
}
