import { Form } from '../interfaces';

export const registerForm: Form[] = [
  {
    name: 'userName',
    placeholder: 'Username',
    type: 'text',
  },
  {
    name: 'email',
    placeholder: 'Email',
    type: 'text',
  },
  {
    name: 'password',
    placeholder: 'Password',
    type: 'password',
  },
  {
    name: 'confirmPassword',
    placeholder: 'Confirm Password',
    type: 'password',
  },
];
