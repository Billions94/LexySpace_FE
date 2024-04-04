import { ReduxState } from '../../interfaces';

interface DynamicFilter<T> {
  array: T[];
  payload?: any;
  state?: ReduxState['data'];
  note?: boolean;
}

export function dynamicFilter<T>({
  array,
  payload,
  state,
  note,
}: DynamicFilter<T>) {
  if (payload && note) {
    return array.filter((item) => item !== payload);
  } else if (payload)
    return array.filter((item) => (item as any).id !== payload);

  return array.filter((item) => (item as any).id !== state?.user.id);
}
