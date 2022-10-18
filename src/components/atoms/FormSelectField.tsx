import {
    FormControl,
    FormHelperText,
    MenuItem,
    Select,
    useMediaQuery,
  } from '@mui/material';
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    label: any,
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options?: Array<{ label: string; value: any }>;
    disabled?: boolean;
  }
  
  type TFormSelect = {
    field: IFormField<TFormSelectOptions>;
  };
  
  export const FormSelectField = ({ field }: TFormSelect) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isSmallDevice = useMediaQuery((theme: any) =>
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