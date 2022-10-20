import { ReactNode } from 'react';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { IFormField } from 'types';

export interface TFormationTextFieldOptions {
  placeholder?: string;
  inputMode?:
    | 'none'
    | 'text'
    | 'tel'
    | 'url'
    | 'email'
    | 'numeric'
    | 'decimal'
    | 'search';
  maxLength?: number;
  autoCapitalize?: boolean;
  autoFocus?: boolean;
  startAdornment?: ReactNode;
  formatInput?: (value: string | undefined | null) => string | undefined | null;
  disabled?: boolean;
}

export type TFormTextField = {
  field: IFormField<TFormationTextFieldOptions>;
  onChange?: () => void;
};

export const FormTextField = (props: TFormTextField) => {
  const {
    name,
    label,
    error,
    control,
    defaultValue = '',
    options: {
      placeholder = '',
      inputMode = 'text',
      autoCapitalize = false,
      autoFocus = false,
      startAdornment = null,
      maxLength,
      formatInput = (value: string) => value,
      disabled = false,
    } = {},
  } = props.field;

  const onChangeFormatted =
    (onChange: (...event: unknown[]) => void) => (e: any) => {
      onChange(formatInput(e.target.value));
      if (props.onChange) props.onChange();
    };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value = '' } }) => (
        <TextField
          name={name}
          onChange={onChangeFormatted(onChange)}
          value={value}
          variant="filled"
          fullWidth
          disabled={disabled}
          label={label}
          placeholder={placeholder}
          error={!!error}
          helperText={error?.message}
          size="small"
          InputProps={{
            startAdornment,
            inputProps: {
              inputMode,
              maxLength,
              style: {
                textTransform: autoCapitalize ? 'capitalize' : 'none',
              },
              autoCapitalize: autoCapitalize ? 'on' : 'off',
            },
          }}
          data-testid={`field-${name}`}
          autoFocus={autoFocus}
        />
      )}
    />
  );
};