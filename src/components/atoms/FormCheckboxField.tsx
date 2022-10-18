import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
  } from '@mui/material';
  import { Controller } from 'react-hook-form';
  import { IFormField } from 'types';
  
  interface TFormationsCheckboxOptions {
    disabled?: boolean;
    size?: 'small' | 'medium';
  }
  
  type TFormationsCheckbox = {
    field: IFormField<TFormationsCheckboxOptions>;
  };
  
  export const FormCheckboxField = ({ field }: TFormationsCheckbox) => {
    const {
      name,
      label = '',
      control,
      error,
      defaultValue = false,
      options: { disabled = false, size = 'medium' } = {},
    } = field;
  
    return (
      <FormControl data-testid={`field-${name}`}>
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field: { value, onChange } }) => (
            <FormControlLabel
              labelPlacement="end"
              label={label}
              sx={{ alignItems: 'flex-start' }}
              control={
                <Checkbox
                  size={size}
                  checked={value}
                  name={name}
                  disabled={disabled}
                  onChange={(e) => {
                    onChange(e.target.checked);
                  }}
                />
              }
            />
          )}
        />
        <FormHelperText error>{error?.message}</FormHelperText>
      </FormControl>
    );
  };