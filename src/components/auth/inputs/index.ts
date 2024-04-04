import { LoginInput, NewUserInput, RegisterInput } from '../interfaces';

export const registerInput: RegisterInput = {
  userName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const loginInput: LoginInput = {
  email: '',
  password: '',
};

export const newUserInput: NewUserInput = {
  firstName: '',
  lastName: '',
  bio: '',
  location: '',
};
