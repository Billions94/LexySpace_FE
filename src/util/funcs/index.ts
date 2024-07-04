import { retrieveAccessToken } from '../../redux/store';
import { Form, FormAttribute } from '../../components/auth/interfaces';

export function getFormAttributes<T>(input: T, forms: Form[]): FormAttribute[] {
  const attributes: FormAttribute[] = [];

  for (const [index, value] of Object.values(<any>input).entries()) {
    const attribute = {
      type: forms[index].type,
      name: forms[index].name,
      placeholder: forms[index].placeholder,
      value: String(value),
    };

    attributes.push(attribute);
  }

  return attributes;
}

export function setTokens(accessToken: string, refreshToken: string) {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
}

export function useTokens(): { accessToken: string; refreshToken: string } {
  const { accessToken, refreshToken } = retrieveAccessToken() ?? {};
  return { accessToken, refreshToken };
}
