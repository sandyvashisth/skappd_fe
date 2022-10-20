import InputMask from 'react-input-mask';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { IFormField } from 'types';

interface TFormPhoneOptions {
  mask?: string;
  disabled?: boolean;
}

type TFormPhoneField = {
  field: IFormField<TFormPhoneOptions>;
};

export const FormPhoneField = ({ field }: TFormPhoneField) => {
  const {
    name,
    label,
    error,
    defaultValue = '',
    options: { mask = '(999) 999-9999', disabled = false } = {},
    control,
  } = field;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { value, onChange } }) => (
        <InputMask
          mask={mask}
          value={value}
          onChange={onChange}
          disabled={disabled}
        >
          {/* https://github.com/sanniassin/react-input-mask/issues/139 */}
          {/* https://stackoverflow.com/questions/72114032/cannot-use-react-input-mask-with-a-children-component-in-react */}
          {/* @ts-ignore */}
          {() => (
            <TextField
              variant="filled"
              name={name}
              fullWidth
              size="small"
              label={label}
              error={!!error}
              helperText={error?.message}
              data-testid={`field-${name}`}
              {...{
                disabled,
              }}
            />
          )}
        </InputMask>
      )}
    />
  );
};