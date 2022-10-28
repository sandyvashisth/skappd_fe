import { FunctionComponent, useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { TextField, InputAdornment, FormHelperText } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import { styled } from "@mui/material/styles";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { IFormField } from "types";

interface TFormInputWithIconOptions {
  type?: string;
  defaultValue?: string;
}

type TFormInputWithIcon = {
  field: IFormField<TFormInputWithIconOptions>;
  formInstance: UseFormReturn;
};

const StyledTextField = styled(TextField)`
  margin-bottom: 25px;
  width: 100%;
`;

const FormInputWithIcon: FunctionComponent<TFormInputWithIcon> = ({
  field,
  formInstance,
}) => {
  const {
    name,
    label = "",
    options: { type = "text", defaultValue = "" } = {},
    control,
  } = field;
  const {
    formState,
    formState: { errors },
    getFieldState,
    trigger,
  } = formInstance;
  const [showIcon, setShowIcon] = useState(false);
  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { value, onChange } }) => (
          <StyledTextField
            label={label}
            id={name}
            variant="filled"
            size="small"
            type={type}
            error={!!errors[field?.name]?.message}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={() => {
              setShowIcon(true);
              trigger(name);
            }}
            autoComplete={type === "password" ? "new-password" : ""}
            InputProps={{
              endAdornment: showIcon && (
                <InputAdornment position="end">
                  {!errors[field?.name]?.message && (
                    <DoneIcon sx={{ color: "#1EC271" }} />
                  )}
                  {!!errors[field?.name]?.message && (
                    <ErrorOutlineIcon sx={{ color: "#d32f2f" }} />
                  )}
                </InputAdornment>
              ),
            }}
          />
        )}
      />
      {errors[field?.name] && (
        <FormHelperText error sx={{ mb: "10px", mt: "-20px" }}>
          {errors[field?.name]?.message as string}
        </FormHelperText>
      )}
    </>
  );
};

export default FormInputWithIcon;
