import { ReactNode } from "react";
import { TextField } from "@mui/material";
import { Controller, UseFormReturn } from "react-hook-form";
import { IFormField } from "types";

export interface TFormationTextFieldOptions {
  placeholder?: string;
  inputMode?:
    | "none"
    | "text"
    | "tel"
    | "url"
    | "email"
    | "numeric"
    | "decimal"
    | "search";
  maxLength?: number;
  autoCapitalize?: boolean;
  autoFocus?: boolean;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  type?: string;
  formatInput?: (value: string | undefined | null) => string | undefined | null;
  disabled?: boolean;
  isValidateOnBlur?: boolean;
}

export type TFormTextField = {
  field: IFormField<TFormationTextFieldOptions>;
  formInstance: UseFormReturn;
  onChange?: () => void;
  onBlur?: (event: any) => void;
};

export const FormTextField = (props: TFormTextField) => {
  const {
    name,
    label,
    error,
    control,
    defaultValue = "",
    options: {
      type = "text",
      placeholder = "",
      inputMode = "text",
      autoCapitalize = false,
      autoFocus = false,
      startAdornment = null,
      endAdornment = null,
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

  const handleOnBlur = (e: any) => {
    if (props.onBlur) props.onBlur(e);
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value = "" } }) => (
        <TextField
          name={name}
          onChange={onChangeFormatted(onChange)}
          onBlur={handleOnBlur}
          value={value}
          variant="filled"
          fullWidth
          disabled={disabled}
          label={label}
          placeholder={placeholder}
          error={!!error}
          helperText={error?.message}
          size="small"
          type={type}
          InputProps={{
            startAdornment,
            endAdornment,
            inputProps: {
              inputMode,
              maxLength,
              style: {
                textTransform: autoCapitalize ? "capitalize" : "none",
              },
              autoCapitalize: autoCapitalize ? "on" : "off",
            },
          }}
          sx={{ mb: "24px" }}
          data-testid={`field-${name}`}
          autoFocus={autoFocus}
        />
      )}
    />
  );
};
