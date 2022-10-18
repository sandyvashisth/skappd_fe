import { ReactNode } from 'react';
import { Control, FieldError } from 'react-hook-form';

export interface IFormField<TOptions extends Record<string, any> = any> {
  name: string;
  readOnly?: boolean;
  disabled?: boolean;
  label?: ReactNode | string;
  options?: TOptions;
  defaultValue?: any;
  error?: FieldError;
  control: Control<any>;
}
export type FormData<T extends Record<string, any> = any> = T;