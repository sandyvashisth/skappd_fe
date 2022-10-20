import {
    FormControl,
    FormHelperText,
    MenuItem,
    Select,
    Theme,
    useMediaQuery,
  } from '@mui/material';
import { ReactNode } from 'react';
  import { Controller } from 'react-hook-form';
  import { IFormField } from 'types';
  
  const responsivePlaceHolder = (
    isSmallDevice: boolean,
    placeholder: string | undefined,
  ) =>
    isSmallDevice ? (
      <option aria-label="None" value="" disabled />
    ) : (
      <MenuItem value="" disabled>
        {placeholder}
      </MenuItem>
    );
  
  const responsiveMenuItem = (
    isSmallDevice: boolean,
    label: ReactNode,
    value: string,
  ) =>
    isSmallDevice ? (
      <option key={value} value={value}>
        {label}
      </option>
    ) : (
      <MenuItem key={value} value={value}>
        {label}
      </MenuItem>
    );
  
  export interface TFormSelectOptions {
    placeholder?: string;
    options?: Array<{ label: string; value: string }>;
    disabled?: boolean;
  }
  
  type TFormSelect = {
    field: IFormField<TFormSelectOptions>;
  };
  
  export const FormSelectField = ({ field }: TFormSelect) => {
    const isSmallDevice = useMediaQuery((theme: Theme) =>
      theme.breakpoints.down('sm'),
    );
  
    const {
      name,
      label,
      error,
      defaultValue,
      control,
      options: { placeholder, options = [], disabled = false } = {},
    } = field;
  
    return (
      <FormControl
        variant="outlined"
        fullWidth
        data-testid={`field-${name}`}
        error={!!error}
      >
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue || null}
          render={({ field: { onChange, value } }) => (
            <Select
              label={label}
              native={isSmallDevice}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              disabled={disabled}
              variant="filled"
            >
              {placeholder && responsivePlaceHolder(isSmallDevice, placeholder)}
              {options.map(({ label, value }) =>
                responsiveMenuItem(isSmallDevice, label, value),
              )}
            </Select>
          )}
        />
        <FormHelperText>{error?.message || ''}</FormHelperText>
      </FormControl>
    );
  };